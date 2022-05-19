const { DataTypes } = require("sequelize");

const User = {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

export { User };
