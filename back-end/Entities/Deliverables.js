import db from "../dbConfig.js";
import Sequelize from "sequelize";

const Deliverable = db.define("Deliverable", {
  DeliverableID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  ProjectID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  Title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  DueDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

export default Deliverable;
