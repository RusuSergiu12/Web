import mysql from "mysql2/promise.js";
import env from "dotenv";
import User from "./Users.js";
import Deliverable from "./Deliverables.js";
import Grade from "./Grades.js";
import Jury from "./Juries.js";
import Permission from "./Permissions.js";
import Project from "./Projects.js";

env.config();

function Create_DB() {
  let conn;

  mysql
    .createConnection({
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    })
    .then((connection) => {
      conn = connection;
      return connection.query(
        `CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`
      );
    })
    .then(() => {
      return conn.end();
    })
    .catch((err) => {
      console.warn(err.stack);
    });
}
function FK_Config() {
  // user and projects 1-n
  User.hasMany(Project, { as: "Projects", foreignKey: "UserID" });
  Project.belongsTo(User, { as: "User", foreignKey: "UserID" });
  // project and deliverables 1-n
  Project.hasMany(Deliverable, { as: "Deliverables", foreignKey: "ProjectID" });
  Deliverable.belongsTo(Project, { as: "Project", foreignKey: "ProjectID" });
  // user and jury 1-n
  User.hasMany(Jury, { as: "Juries", foreignKey: "UserID" });
  Jury.belongsTo(User, { as: "User", foreignKey: "UserID" });
  // project and jury 1-n
  Project.hasMany(Jury, { as: "Juries", foreignKey: "ProjectID" });
  Jury.belongsTo(Project, { as: "Project", foreignKey: "ProjectID" });
  // grade and jury 1-n
  Grade.hasMany(Jury, { as: "Juries", foreignKey: "GradeID" });
  Jury.belongsTo(Grade, { as: "Grade", foreignKey: "GradeID" });
  // grade and deliverables 1-n
  Grade.hasMany(Deliverable, { as: "Deliverables", foreignKey: "GradeID" });
  Deliverable.belongsTo(Grade, { as: "Grade", foreignKey: "GradeID" });
  // user and permission 1-n
  User.hasMany(Permission, { as: "Permissions", foreignKey: "UserID" });
  Permission.belongsTo(User, { as: "User", foreignKey: "UserID" });
  // project and permission 1-n
  Project.hasMany(Permission, { as: "Permissions", foreignKey: "ProjectID" });
  Permission.belongsTo(Project, { as: "Project", foreignKey: "ProjectID" });
}

function DB_Init() {
  Create_DB();
  FK_Config();
}

export default DB_Init;
