const fp = require("fastify-plugin");
const { DataTypes } = require("sequelize");

function plugin(fastify, options, done) {
  const User = fastify.sequelize.define("User", {
    // Model attributes are defined here
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  function decorate() {
    fastify.decorate("user", User);
  }

  User.sync();
  decorate();

  Promise.resolve();
  done();
}

module.exports = fp(plugin);
