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

export const { updateUser, createUser, deleteUser } = {
  updateUser: { ...userBody, ...userParams },
  createUser: userBody,
  deleteUser: userParams,
};
