import { FastifyPluginCallback } from "fastify";
import { createNote } from "./validations";

const routes: FastifyPluginCallback = (fastify, options, done) => {
  fastify.get("/notes", async (request, reply) => {
    try {
      // Find all notes
      const notes = await fastify.note.findAll();
      return notes;
    } catch (error) {
      throw new Error(`Unable to find any notes.`);
    }
  });

  fastify.get<{ Params: { id: number } }>(
    "/notes/:id",
    async (request, reply) => {
      try {
        const note = await fastify.note.findOne({
          where: { id: request.params.id },
          include: fastify.user,
        });
        if (!note) {
          reply.code(404);
          throw new Error(`Unable to find note.`);
        }
        return note;
      } catch (error) {
        console.error(error);
        throw new Error(`Unable to find note.`);
      }
    }
  );

  fastify.post<{ Body: { title: string; content: string; UserId: number } }>(
    "/notes",
    { schema: createNote },
    async (request, reply) => {
      try {
        const note = await fastify.note.create({
          title: request.body.title,
          content: request.body.content,
          UserId: request.body.UserId,
        });
        return note;
      } catch (error) {
        console.error(error);
        throw new Error(`Unable to create note.`);
      }
    }
  );

  fastify.delete<{ Params: { id: number } }>(
    "/notes/:id",
    async (request, reply) => {
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
    }
  );

  fastify.put<{
    Params: { id: number };
    Body: { title: string; content: string };
  }>("/notes/:id", async (request, reply) => {
    try {
      const note = await fastify.note.update(
        { notename: request.body.title, content: request.body.content },
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

export default routes;
