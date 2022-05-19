import { DataTypes } from "sequelize";

const Note = {
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
