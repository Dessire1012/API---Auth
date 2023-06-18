const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const { isEmail, isPassword } = require("./utils/validator");
const { getInfo } = require("./utils/alumno.service");

const knex = require("./utils/database");

app.post("/register", async function (req, res) {
  try {
    const { email, password } = req.body;
    const errorMessages = [];

    if (!isEmail(email)) {
      errorMessages.push("Email is not valid");
    }

    if (!isPassword(password)) {
      errorMessages.push("Password is not valid");
    }

    if (errorMessages.length) {
      res.status(400).send({ error: errorMessages });
    } else {
      const result = await knex.transaction(async (trx) => {
        const [outMsg] = await trx.raw(
          "CALL registerAlumno(?, ?, ?, ?, @cuenta_)",
          [req.body.name, req.body.email, req.body.password, req.body.campus]
        );

        const [cuentaResult] = await trx.raw("SELECT @cuenta_ AS cuenta");
        const cuenta = cuentaResult[0].cuenta;

        return cuenta;
      });
      res.json({
        success: true,
        cuenta: result,
      });
    }
  } catch (error) {
    console.error("Error registering alumno:", error);
    res.status(500).json({
      success: false,
      message: "Failed to register alumno",
    });
  }
});

app.post("/login", async function (req, res) {
  const { cuenta, password } = req.body;
  const errorMessages = [];

  if (!isPassword(password)) {
    errorMessages.push("Password is not valid");
  }

  if (errorMessages.length) {
    res.status(400).send({ error: errorMessages });
  } else {
    const [info] = await getInfo(cuenta);

    if (password == info.password) {
      res.send({
        success: true,
        message: "Welcome Back " + info.name.split(" ")[0] + "!",
      });
    } else {
      res.status(401).send({
        message: "Incorrect password",
      });
    }
  }
});

app.listen(3000);
