const knex = require("../db");
const TABLE = "GAME";

exports.create = async (req, res) => {
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

exports.getList = async (req, res) => {
  // TODO: add query for range
  // TODO: add header for content-range
  let filter = {};
  if (req.query.filter) {
    const parsed = JSON.parse(JSON.parse(req.query.filter));
    if (parsed) filter = parsed;
  }
  let field = "id";
  let order = "asc";
  if (req.query.sort) {
    const parsed = JSON.parse(JSON.parse(req.query.sort));
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

exports.getOne = async (req, res) => {
  knex(TABLE)
    .where("id", req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: `${TABLE}: there was an error getting ${req.params.id}: ${err}`,
      });
    });
};

exports.getMany = async (req, res) => {
  // TODO: not being called
  console.log("HII");
  let ids = ["54_5_LAC_NO"];
  if (req.query.filter) {
    const parsed = JSON.parse(JSON.parse(req.query.filter));
    if (parsed) ids = parsed;
  }
  knex(TABLE)
    .whereIn("id", ids)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: `${TABLE}: there was an error getting ${req.query.filter.id}: ${err}`,
      });
    });
};

exports.update = async (req, res) => {
  knex(TABLE)
    .where("id", req.params.id)
    .update(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: `${TABLE}: there was an error updating ${req.params.id}: ${err}`,
      });
    });
};

exports.updateMany = async (req, res) => {
  knex(TABLE)
    .whereIn("id", req.query.filter.id)
    .update(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: `${TABLE}: there was an error updating ${req.query.filter.id}: ${err}`,
      });
    });
};

exports.delete = async (req, res) => {
  knex(TABLE)
    .where("id", req.params.id)
    .del()
    .then(() => {
      res.json({ message: `${TABLE}: ${req.body.id} deleted.` });
    })
    .catch((err) => {
      res.status(500).json({
        message: `${TABLE}: there was an error deleting ${req.body.id}: ${err}`,
      });
    });
};

exports.deleteMany = async (req, res) => {
  knex(TABLE)
    .whereIn("id", req.query.filter.id)
    .del()
    .then(() => {
      res.json({ message: `${TABLE}: ${req.query.filter.id} deleted.` });
    })
    .catch((err) => {
      res.status(500).json({
        message: `${TABLE}: there was an error deleting ${req.query.filter.id}: ${err}`,
      });
    });
};
