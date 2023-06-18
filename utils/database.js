const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "contra",
    database: "registro",
  },
});

module.exports = knex;
