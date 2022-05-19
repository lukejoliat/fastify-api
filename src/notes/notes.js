const fp = require("fastify-plugin");
const { DataTypes } = require("sequelize");

function plugin(fastify, options, done) {
  const Note = fastify.sequelize.define("Note", {
    // Model attributes are defined here
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    author: {},
  });

  function decorate() {
    fastify.decorate("note", Note);
  }

  Note.sync();
  decorate();

  Promise.resolve();
  done();
}

module.exports = fp(plugin);
