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

export const { createNote, updateNote } = {
  updateNote: noteSchema,
  createNote: noteSchema,
};
