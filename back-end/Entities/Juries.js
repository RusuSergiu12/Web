import db from "../dbConfig.js";
import Sequelize from "sequelize";

const Jury = db.define("Jury", {
  JuryID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  ProjectID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  UserID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  IsEligible: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

export default Jury;
