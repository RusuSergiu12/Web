import express from "express";
import { getUserProjects } from "../DataAccess/UserProjectDA.js";

let userProjectRouter = express.Router();

userProjectRouter.route("/userProjects").get(async (req, res) => {
  return res.json(await getUserProjects());
});

export default userProjectRouter;
