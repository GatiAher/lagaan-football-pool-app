const knex = require("../db");

module.exports = function (TABLE) {
  const module = {};

  const getIdsFromQuery = (reqQuery) => {
    let ids = [];
    if (reqQuery.filter) {
      const parsed = JSON.parse(reqQuery.filter);
      if (parsed) ids = parsed;
    }
    return ids;
  };

  const getIdFromParams = (reqParams) => {
    return reqParams.id;
  };

  module.getMany = async (req, res) => {
    const ids = getIdsFromQuery(req.query);
    knex(TABLE)
      .whereIn("id", ids)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json({
          message: `${TABLE}: there was an error getting ${ids}: ${err}`,
        });
      });
  };

  module.getOne = async (req, res) => {
    const id = getIdFromParams(req.params);
    knex(TABLE)
      .where("id", id)
      .then((data) => {
        if (data.length === 0)
          throw new Error(
            `${id} cannot be retrieved because it does not exist.`
          );
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json({
          message: `${TABLE}: there was an error getting ${id}: ${err}`,
        });
      });
  };

  module.getList = async (req, res) => {
    // TODO: add query for range
    // TODO: add header for content-range
    let filter = {};
    if (req.query.filter) {
      const parsed = JSON.parse(req.query.filter);
      if (parsed) filter = parsed;
    }
    let field = "id";
    let order = "asc";
    if (req.query.sort) {
      const parsed = JSON.parse(req.query.sort);
      console.log(parsed);
      if (parsed[0]) field = parsed[0];
      if (parsed[1]) order = parsed[0];
    }
    knex(TABLE)
      .where(filter)
      .orderBy(field, order)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json({
          message: `${TABLE}: there was an error getting the data: ${err}`,
        });
      });
  };

  module.update = async (req, res) => {
    const id = getIdFromParams(req.params);
    knex(TABLE)
      .where("id", id)
      .update(req.body)
      .then((numItems) => {
        if (numItems === 0)
          throw new Error(`${id} cannot be updated because it does not exist.`);
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

  module.updateMany = async (req, res) => {
    const ids = getIdsFromQuery(req.query);
    knex(TABLE)
      .whereIn("id", ids)
      .update(req.body)
      .then((numItems) => {
        res.json({
          message: `${TABLE}: ${numItems} / ${ids.length} items updated.`,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: `${TABLE}: there was an error updating ${ids}: ${err}`,
        });
      });
  };

  module.delete = async (req, res) => {
    const id = getIdFromParams(req.params);
    knex(TABLE)
      .where("id", id)
      .del()
      .then((numItems) => {
        if (numItems === 0)
          throw new Error(`${id} cannot be deleted because it does not exist.`);
        res.json({ message: `${TABLE}: ${id} deleted.` });
      })
      .catch((err) => {
        res.status(500).json({
          message: `${TABLE}: there was an error deleting ${id}: ${err}`,
        });
      });
  };

  module.deleteMany = async (req, res) => {
    const ids = getIdsFromQuery(req.query);
    knex(TABLE)
      .whereIn("id", ids)
      .del()
      .then((numItems) => {
        res.json({
          message: `${TABLE}: ${numItems} / ${ids.length} items deleted.`,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: `${TABLE}: there was an error deleting ${ids}: ${err}`,
        });
      });
  };

  module.create = async (req, res) => {
    if (!req.body.id) {
      res.status(400).json({
        message: `${TABLE}: there was an error during creation: id not present in request body`,
      });
    }
    knex(TABLE)
      .insert(req.body)
      .then(() => {
        res.json({
          message: `${TABLE}: ${req.body.id} created.`,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: `${TABLE}: there was an error creating ${req.body.id}: ${err}`,
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
