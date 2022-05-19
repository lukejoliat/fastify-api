import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import { Sequelize } from "sequelize";
import { Note as NoteModel } from "./notes/notes";
import { User as UserModel } from "./users/users";

const plugin: FastifyPluginCallback = (fastify, options, done) => {
  const seq: Sequelize = fastify.sequelize;
  const Note = fastify.sequelize.define("Note", NoteModel);
  const User = seq.define("User", UserModel);
  const decorate = () => {
    fastify.decorate("note", Note);
    fastify.decorate("user", User);
  };

  User.hasMany(Note, {});
  Note.belongsTo(User);

  Note.sync();
  User.sync();
  decorate();

  done();
};

export default fp(plugin);
