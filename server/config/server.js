const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { ValidationError } = require('express-validation');

const orderRoutes = require('src/routes/orderRoutes');
const searchRoutes = require('src/routes/searchRoutes');
const userRoutes = require('src/routes/userRoutes');

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
 * Base route
 */
server.get('/', (req, res) => res.sendStatus(200));

/**
 * Application routes
 */
// server.use('/api', orderRoutes);
// server.use('/api', searchRoutes);
// server.use('/api', userRoutes);

/**
 * Handling unexpected and validation errors
 */
server.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }
  return res.status(500).json(err);
});

module.exports = server;
