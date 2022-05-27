import {
  FastifyInstance,
  FastifyPluginCallback,
  FastifyPluginOptions,
} from "fastify";
import sequelizeConfig from "./config/sequelize";
import * as fsequelize from "fastify-sequelize";
import { Sequelize } from "sequelize/types";
import fastifycors from "@fastify/cors";

declare module "fastify" {
  interface FastifyInstance {
    sequelize: Sequelize;
    user: any;
    note: any;
  }
}

const app: FastifyPluginCallback = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  next
) => {
  // TODO: register dynamically
  fastify.register(fsequelize, sequelizeConfig);
  fastify.register(fastifycors, {
    origin: true,
  });

  fastify.register(import("./models"));
  fastify.register(import("./users/routes"));
  fastify.register(import("./notes/routes"));
  next();
};

export default app;
