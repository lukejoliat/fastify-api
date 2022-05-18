module.exports = function (fastify, options, done) {
  fastify.setErrorHandler(function (error, request, reply) {
    // handle errors
  });
  done();
};
