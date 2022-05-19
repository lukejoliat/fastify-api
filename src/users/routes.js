const { ValidationError } = require("sequelize");
const { updateUser, getUser, deleteUser } = require("./validations");
const validations = require("./validations");

module.exports = function (fastify, options, done) {
  fastify.get("/", async (request, reply) => {
    try {
      await fastify.sequelize.authenticate();
      return "Connection has been established successfully.";
    } catch (error) {
      console.error(error);
      throw new Error(`Unable to connect to the database: ${error}`);
    }
  });

  fastify.get("/users", async (request, reply) => {
    try {
      // Find all users
      const users = await fastify.user.findAll();
      return users;
    } catch (error) {
      console.error(error);
      throw new Error(`Unable to find any users.`);
    }
  });

  fastify.get("/users/:id", async (request, reply) => {
    try {
      // Find all users
      const user = await fastify.user.findByPk(request.params.id);
      if (!user) {
        // reply.code(404);
        reply.send(new Error("Unable to find user."));
        // throw new Error(`Unable to find user.`);
      }
      return user;
    } catch (error) {
      console.error(error);
      throw new Error(`Unable to find user.`);
    }
  });

  fastify.post("/users", async (request, reply) => {
    try {
      // create a user
      const user = await fastify.user.create({
        username: request.body.username,
      });
      return user;
    } catch (error) {
      console.error(error);
      throw new Error("Unable to create user.");
    }
  });

  fastify.delete(
    "/users/:id",
    { schema: deleteUser },
    async (request, reply) => {
      try {
        const user = await fastify.user.destroy({
          where: {
            id: request.params.id,
          },
        });
        reply.code(204);
      } catch (error) {
        console.error(error);
        throw new Error("Unable to delete user.");
      }
    }
  );

  fastify.put("/users/:id", { schema: updateUser }, async (request, reply) => {
    console.log("updating");
    try {
      const user = await fastify.user.findOne({
        where: {
          id: request.params.id,
        },
      });
      if (!user) {
        reply.code(404);
        throw new Error(`Could not find user.`);
      }
      await fastify.user.update(
        { username: request.body.username },
        {
          where: {
            id: request.params.id,
          },
        }
      );
      return user;
    } catch (error) {
      console.error(error);
      throw new Error("Unable to update user.");
    }
  });

  done();
};
