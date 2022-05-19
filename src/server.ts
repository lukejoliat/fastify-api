import fastify from "fastify";
import app from "./app";

const f = fastify();

f.register(app);

// Run the server!
const start = async () => {
  try {
    await f.listen(3000);
  } catch (err) {
    f.log.error(err);
    process.exit(1);
  }
};
start();
