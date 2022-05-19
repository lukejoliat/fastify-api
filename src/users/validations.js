const userBody = {
  body: {
    type: "object",
    properties: {
      username: { type: "string" },
    },
    required: ["username"],
  },
};

const userParams = {
  params: {
    type: "object",
    properties: {
      id: { type: "number" },
    },
    required: ["id"],
  },
};

module.exports = {
  updateUser: {
    ...userBody,
    ...userParams,
  },
  createUser: userBody,
  deleteUser: userParams,
};
