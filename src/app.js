const fsequelize = require("fastify-sequelize");
const sequelizeConfig = require("./config/sequelize");

module.exports = function (fastify, options, next) {
  // TODO: register dynamically
  fastify.register(fsequelize, sequelizeConfig);
  fastify.register(require("./errors"));
  fastify.register(require("./users/users"));
  fastify.register(require("./users/routes"));
  next();
};
