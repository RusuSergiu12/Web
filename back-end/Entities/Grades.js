import db from "../dbConfig.js";
import Sequelize from "sequelize";

const Grade = db.define("Grade", {
  GradeID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  UserID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  DeliverableID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  GradeValue: {
    type: Sequelize.DECIMAL(3, 2),
    allowNull: false,
    validate: {
      min: 1,
      max: 10,
    },
  },
  GradeDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

export default Grade;
