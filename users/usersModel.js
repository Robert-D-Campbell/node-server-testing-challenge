const db = require("../data/dbConfig.js");

module.exports = {
  insert,
  remove,
  getAll,
  findById
};

async function insert(user) {
  return db("users")
    .insert(user)
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function remove(id) {
  return db("users")
    .where("id", id)
    .del();
}

function getAll() {
  return db("users");
}

function findById(id) {
  return db("users")
    .select("id", "name")
    .where({ id })
    .first();
}
