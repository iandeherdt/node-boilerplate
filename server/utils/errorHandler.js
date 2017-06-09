const Boom = require('boom');

function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  let error = err;
  if (!error.isBoom) {
    error = Boom.badImplementation();
  }
  return res.status(error.output.statusCode).json(error.output.payload);
}

module.exports = errorHandler;