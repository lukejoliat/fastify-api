import { DataTypes } from "sequelize";

const Note = {
  // Model attributes are defined here
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: true,
  },
};

export { Note };
