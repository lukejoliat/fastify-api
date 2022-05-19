module.exports = function (fastify, options, done) {
  fastify.get("/", async (request, reply) => {
    try {
      await fastify.sequelize.authenticate();
      return "Connection has been established successfully.";
    } catch (error) {
      return `Unable to connect to the database: ${error}`;
    }
  });

  fastify.get("/notes", async (request, reply) => {
    try {
      // Find all notes
      const notes = await fastify.note.findAll();
      return notes;
    } catch (error) {
      throw new Error(`Unable to find any notes.`);
    }
  });

  fastify.get("/notes/:id", async (request, reply) => {
    try {
      const note = await fastify.note.findByPk(request.params.id);
      if (!note) {
        reply.code(404);
        throw new Error(`Unable to find note.`);
      }
      return note;
    } catch (error) {
      throw new Error(`Unable to find note.`);
    }
  });

  fastify.post("/notes", async (request, reply) => {
    try {
      const note = await fastify.note.create({
        title: request.body.title,
        content: request.body.content,
      });
      return note;
    } catch (error) {
      console.error(error);
      throw new Error(`Unable to create note.`);
    }
  });

  fastify.delete("/notes/:id", async (request, reply) => {
    try {
      const note = await fastify.note.destroy({
        where: {
          id: request.params.id,
        },
      });
      reply.code(204);
    } catch (error) {
      console.error(error);
      throw new Error(`Unable to delete note.`);
    }
  });

  fastify.put("/notes/:id", async (request, reply) => {
    try {
      const note = await fastify.note.update(
        { notename: request.body.notename, content: request.body.content },
        {
          where: {
            id: request.params.id,
          },
        }
      );
      return note;
    } catch (error) {
      console.error(error);
      throw new Error(`Unable to update note.`);
    }
  });

  done();
};
