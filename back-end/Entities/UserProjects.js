import db from "../dbConfig.js";
import Sequelize from "sequelize";

const UserProject = db.define("UserProjects", {
  UserID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  ProjectID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

export default UserProject;
