import db from "../dbConfig.js";
import Sequelize from "sequelize";

const User = db.define("User", {
  UserID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  UserName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  Password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  UserType: {
    type: Sequelize.ENUM,
    values: ["student", "professor"],
    allowNull: false,
  },
});

export default User;
