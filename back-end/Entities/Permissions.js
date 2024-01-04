import db from "../dbConfig.js";
import Sequelize from "sequelize";

const Permission = db.define("Permission", {
  PermissionID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  UserID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  ProjectID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  CanGrade: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  CanModifyGrade: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  GradeModificationDeadline: {
    type: Sequelize.DATE,
    allowNull: true,
  },
});

export default Permission;
