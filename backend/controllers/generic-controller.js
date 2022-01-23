const knex = require("../db");
const date = require('date-and-time')

module.exports = function (TABLE) {
  const module = {};

  const getIdsFromQuery = (reqQuery) => {
    if (reqQuery.filter) {
      const parsed = JSON.parse(reqQuery.filter);
      if (parsed && parsed.id) {
        if (typeof parsed.id == "string") {
          return [];
        } else if (parsed.id.length > 0) {
          return parsed.id;
        }
      }
    }
    return [];
  };

  const getIdFromParams = (reqParams) => {
    return reqParams.id;
  };

  const generatePickWindowTime = (reqBody) => {
    const { created_at, updated_at, ...properBody } = reqBody;
    if (properBody.pickWindowTime) {
      return properBody.pickWindowTime;
    }

    const pickWindowDateObj = date.parse(properBody.startTime, "YYYY-MM-DD hh:mm A");

    // default pick window is start time's day, 1pm
    pickWindowDateObj.setHours(13);

    if (pickWindowDateObj.getDay() === 1) {
      // if start time is Monday, pick window is Sunday 1pm
      pickWindowDateObj.setDate(pickWindowDateObj.getDate() - 1);
      pickWindowDateObj.setHours(13);
    }

    if (pickWindowDateObj.getDay() === 4) {
      // if start time is Thursday, pick window is Thursday 6pm
      pickWindowDateObj.setHours(18);
      // if start time is Thanksgiving (4th Thursday of November) then Thursday 10am
      const occurance = Math.ceil(pickWindowDateObj.getDate() / 7);
      if (occurance === 4 && pickWindowDateObj.getMonth() === 10) {
        pickWindowDateObj.setHours(10);
      }
    }

    // generate datetimelocal string in format YYYY-MM-DD hh:mm _M
    return date.format(pickWindowDateObj, "YYYY-MM-DD hh:mm A");
  }

  const getProperBody = (reqBody) => {
    const { created_at, updated_at, ...properBody } = reqBody;
    if (TABLE === "Game") {
      // generate id
      properBody.id = `${reqBody.week}_${reqBody.visTeam}_${reqBody.homeTeam}`;
      // generate default pick window time if it does not exist
      properBody.pickWindowTime = generatePickWindowTime(reqBody);
    }
    return properBody;
  };

  const getValidateStartTime = (reqBody) => {
    const { startTime } = reqBody;
    if (startTime) {
      return /^[0-9]{4}-[0-1][0-9]-[0-3][0-9] [0-1][0-9]:[0-5][0-9] [A|P][M]$/.test(
        startTime
      );
    }
    return true;
  };

  const getValidatePickWindowTime = (reqBody) => {
    const { pickWindowTime } = reqBody;
    if (pickWindowTime !== undefined) {
      return /^[0-9]{4}-[0-1][0-9]-[0-3][0-9] [0-1][0-9]:[0-5][0-9] [A|P][M]$/.test(
        pickWindowTime
      );
    }
    return true;
  };

  module.getOne = async (req, res) => {
    const id = getIdFromParams(req.params);
    knex(TABLE)
      .where("id", id)
      .then((data) => {
        if (data.length === 0) {
          throw new Error(
            `${id} cannot be retrieved because it does not exist.`
          );
        }
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json({
          message: `${TABLE}: there was an error getting ${id}: ${err}`,
        });
      });
  };

  module.getList = async (req, res) => {
    const builder = knex(TABLE);

    const ids = getIdsFromQuery(req.query);
    if (ids.length) {
      builder.whereIn("id", ids);
    }

    let filter = {};
    if (ids.length == 0 && req.query.filter) {
      const parsed = JSON.parse(req.query.filter);
      if (parsed) {
        filter = parsed;
        builder.where(filter);
      }
    }

    if (req.query.sort) {
      const parsed = JSON.parse(req.query.sort);
      if (parsed) {
        const [field, order] = parsed;
        if (field && order) {
          builder.orderBy(field, order);
        }
      }
    }

    builder
      .then((data) => {
        let responseData = data;
        if (req.query.range) {
          const parsed = JSON.parse(req.query.range);
          if (parsed) {
            const [startRange, endRange] = parsed;
            if (startRange != undefined && endRange != undefined) {
              responseData = data.slice(startRange, endRange);
              res.set(
                "Content-Range",
                `item ${startRange}-${endRange}/${data.length}`
              );
              res.status(206);
            }
          }
        }
        res.json(responseData);
      })
      .catch((err) => {
        res.status(500).json({
          message: `${TABLE}: there was an error getting the data: ${err}`,
        });
      });
  };

  module.update = async (req, res) => {
    const properBody = getProperBody(req.body);
    const id = getIdFromParams(req.params);

    const validateStartTime = getValidateStartTime(properBody);
    if (!validateStartTime) {
      res.status(400).json({
        message: `${TABLE}: there was an error during update: startTime ${properBody.startTime} not in format YYYY-MM-DD hh:mm _M`,
      });
    }

    const validatePickWindowTime = getValidatePickWindowTime(properBody);
    if (!validatePickWindowTime) {
      res.status(400).json({
        message: `${TABLE}: there was an error during update: pickWindowTime ${properBody.pickWindowTime} not in format YYYY-MM-DD hh:mm _M`,
      });
    }

    knex(TABLE)
      .where("id", id)
      .update(properBody)
      .then((numItems) => {
        if (numItems === 0) {
          throw new Error(`${id} cannot be updated because it does not exist.`);
        }
        res.json({
          message: `${TABLE}: ${id} updated.`,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: `${TABLE}: there was an error updating ${id}: ${err}`,
        });
      });
  };

  module.create = async (req, res) => {
    const properBody = getProperBody(req.body);
    const validateStartTime = getValidateStartTime(properBody);
    const validatePickWindowTime = getValidatePickWindowTime(properBody);

    if (!properBody) {
      res.status(400).json({
        message: `${TABLE}: there was an error during creation: id not present in request body`,
      });
    } else if (!validateStartTime) {
      res.status(400).json({
        message: `${TABLE}: there was an error during creation: startTime ${properBody.startTime} not in format YYYY-MM-DD hh:mm _M`,
      });
    } else if (!validatePickWindowTime) {
      res.status(400).json({
        message: `${TABLE}: there was an error during creation: pickWindowTime ${properBody.pickWindowTime} not in format YYYY-MM-DD hh:mm _M`,
      });
    } else {
      knex(TABLE)
        .insert(properBody)
        .then(() => {
          res.json({
            message: `${TABLE}: ${properBody.id} created.`,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: `${TABLE}: there was an error creating ${properBody.id}: ${err}`,
          });
        });
    }
  };

  module.delete = async (req, res) => {
    const id = getIdFromParams(req.params);
    knex(TABLE)
      .where("id", id)
      .del()
      .then((numItems) => {
        if (numItems === 0) {
          throw new Error(`${id} cannot be deleted because it does not exist.`);
        }
        res.json({ message: `${TABLE}: ${id} deleted.` });
      })
      .catch((err) => {
        res.status(500).json({
          message: `${TABLE}: there was an error deleting ${id}: ${err}`,
        });
      });
  };

  module.clearTable = async (req, res) => {
    knex(TABLE)
      .truncate() // remove the selection
      .then(() => {
        res.json({ message: `${TABLE}: removed all items from table.` });
      })
      .catch((err) => {
        res.status(500).json({
          message: `${TABLE}: there was an error removing all items from table: ${err}.`,
        });
      });
  };

  return module;
};
