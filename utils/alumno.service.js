const knex = require("./database");

const getInfo = async (cuenta) => {
  let info = await knex
    .select("name", "email", "password", "campus")
    .from("alumno")
    .where("cuenta", cuenta);
  info = JSON.stringify(info);
  return JSON.parse(info);
};

module.exports = {
  getInfo,
};
