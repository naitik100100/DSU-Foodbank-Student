const express = require("express");
const bodyParser = require("body-parser");
const rp = require("request-promise");
const cors = require("cors");
const appConfig = require("./../app-data/config");

const { ValidationError } = require("express-validation");

/**
 * Express server initialization
 */
const server = express();

/**
 * Application configuration
 * enable all cors requests
 * todo: https://www.npmjs.com/package/cors#configuring-cors-w-dynamic-origin
 */
server.use(cors());
server.use(bodyParser.json());

/**
 * Database Setup
 */
const Sequelize = require("sequelize");
const { request } = require("express");
const { json } = require("body-parser");
const sequelize = new Sequelize(
  "mysql://adminXYZ:adminXYZ@mysql-db-cloud-project.cr1ibpx939ft.us-east-1.rds.amazonaws.com:3306/StudentInformation"
);

/**
 * Databse Connection
 */
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

/**
 * Create Model: Users
 */
const users = sequelize.define("users", {
  bannerid: {
    primaryKey: true,
    allowNull: false,
    type: Sequelize.STRING,
  },
  password: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  firstname: {
    type: Sequelize.STRING,
  },
  lastname: {
    type: Sequelize.STRING,
  },
  emailid: {
    type: Sequelize.STRING,
  },
});

/**
 * Create Model: Orders
 */
const orders = sequelize.define("orders", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  bannerid: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  orderid: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
});
sequelize.sync().then(() => {
  console.log(`Database & tables created!`);
});

/**
 * Handling unexpected and validation errors
 */
server.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }
  return res.status(500).json(err);
});

/*
 * End Point: GET
 * URL: http://IPv4/
 * Usage: Default Route.
 */
server.get("/", (req, res) => res.sendStatus(200));

/*
 * End Point: POST
 * URL: http://IPv4/api/user/add
 * Usage: Creates a new user if it does not exist in the database.
 */
server.post("/api/user/add", (req, res) => {
  users
    .findOrCreate({
      where: { bannerid: req.body.bannerid },
      defaults: {
        bannerid: req.body.bannerid,
        password: req.body.password,
        emailid: req.body.emailid,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
      },
    })
    .then((result) => {
      if (result[1]) {
        res.status(200).send({
          success: true,
          message: "User Created Successfully.",
          user: result[0],
        });
      } else {
        res.status(200).send({
          success: false,
          message: "User Already Exist.",
          user: result[0],
        });
      }
    });
});

/*
 * End Point: POST
 * URL: http://IPv4/api/user
 * Usage: Login with banner id and password.
 */
server.post("/api/user", (req, res) => {
  users
    .findAll({
      where: { bannerid: req.body.bannerid, password: req.body.password },
    })
    .then((result) => {
      if (result.length === 0) {
        res.status(404).send({
          success: false,
          message: `Either invalid username or password`,
        });
      } else {
        res.status(200).send({
          success: true,
          message: `Login Successful`,
          result: result,
        });
      }
    });
});

/*
 * End Point: POST
 * URL: http://IPv4/api/orders
 * Usage: Creates a new user if it does not exist in the databse.
 */
server.post("/api/orders", (req, res) => {
  orders
    .create({
      bannerid: req.body.bannerid,
      orderid: req.body.orderid,
    })
    .then((result) => {
      res.status(200).send({
        success: true,
        message: "Order placed Successfully",
        order: result,
      });
    });
});

/*
 * End Point: GET
 * URL: http://IPv4/api/orders/:bannerId
 * Usage: Get orders of particular banner id.
 */
server.get("/api/orders/:bannerid", (req, res) => {
  orders
    .findAll({
      where: { bannerid: req.params.bannerid },
    })
    .then((result) => {
      if (result.length === 0) {
        res.status(200).send({
          success: false,
          message: "No orders found for the user!",
        });
      } else {
        res.status(200).send({
          success: true,
          message: `Got ${result.length} results`,
          result: result,
        });
      }
    });
});

/*
 * End Point: GET
 * URL: http://IPv4/api/orders/:bannerId/:id
 * Usage: Get specific order of banner id.
 */
server.get("/api/orders/:bannerid/:id", (req, res) => {
  orders
    .findAll({
      where: { bannerid: req.params.bannerid, id: req.params.id },
    })
    .then((result) => {
      if (result.length === 0) {
        res.status(404).send({
          success: false,
          message: `Unable to fetch order for given pair of bannerid:${req.params.bannerid} and id:${req.params.id}!!`,
        });
      } else {
        res.status(200).send({
          success: true,
          message: `Successfully get the order.`,
          result: result,
        });
      }
    });
});

server.get("/api/latestorder/:bannerid", (req, res) => {
  orders
    .findAll({
      where: { bannerid: req.params.bannerid },
      order: [["createdAt", "DESC"]],
      attributes: ["id", "bannerid", "orderid", "createdAt"],
      limit: 1,
    })
    .then((userOrdersRes) => {
      if (userOrdersRes.length === 0) {
        res.status(200).send({
          success: false,
          message: `Unable to fetch order for given bannerid:${req.params.bannerid} `,
        });
      } else {
        res.status(200).send({
          success: true,
          message: `Successfully get the order.`,
          result: userOrdersRes[0],
        });
      }
    });
});

module.exports = server;
