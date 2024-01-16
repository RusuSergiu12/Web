import mysql from "mysql2/promise.js";
import env from "dotenv";
import User from "./Users.js";
import Deliverable from "./Deliverables.js";
import Grade from "./Grades.js";
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
  User.belongsToMany(Project, {
    as: "Projects",
    through: "UserProjects",
    foreignKey: "UserID",
  });
  Project.belongsToMany(User, {
    as: "User",
    through: "UserProjects",
    foreignKey: "ProjectID",
  });

  
  Project.hasMany(Deliverable, { as: "Deliverables", foreignKey: "ProjectID" });
  Deliverable.belongsTo(Project, { as: "Project", foreignKey: "ProjectID" });

 
  User.hasMany(Grade, { as: "Grades", foreignKey: "UserID" });
  Grade.belongsTo(User, { as: "User", foreignKey: "UserID" });
  
  Deliverable.hasMany(Grade, { as: "Grades", foreignKey: "DeliverableID" });
  Grade.belongsTo(Deliverable, {
    as: "Deliverable",
    foreignKey: "DeliverableID",
  });
  
  User.hasMany(Permission, { as: "Permissions", foreignKey: "UserID" });
  Permission.belongsTo(User, { as: "User", foreignKey: "UserID" });
  
  Project.hasMany(Permission, { as: "Permissions", foreignKey: "ProjectID" });
  Permission.belongsTo(Project, { as: "Project", foreignKey: "ProjectID" });
}

function DB_Init() {
  Create_DB();
  FK_Config();
}

export default DB_Init;
