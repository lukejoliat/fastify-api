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

const updateUser = {
  ...userBody,
  ...userParams,
};
const createUser = userBody;
const deleteUser = userParams;

// const

export { updateUser, createUser, deleteUser };
