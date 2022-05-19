const noteSchema = {
  body: {
    type: "object",
    properties: {
      title: { type: "string" },
      content: { type: "string" },
    },
    required: ["title"],
  },
};

const updateNote = noteSchema,
  createNote = noteSchema;

export { createNote, updateNote };
