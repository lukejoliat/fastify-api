const noteSchema = {
  body: {
    type: "object",
    properties: {
      title: { type: "string" },
      content: { type: "string" },
      author: { type: "string " },
    },
    required: ["title"],
  },
};

module.exports = {
  updateNote: noteSchema,
  createNote: noteSchema,
};
