import express from "express";
import {
  getProjects,
  getProjectById,
  createProject,
  deleteProject,
  updateProject,
  getProjectsUserCanGrade,
} from "../DataAccess/ProjectsDA.js";

let projectRouter = express.Router();

projectRouter.route("/project").post(async (req, res) => {
  return res.status(201).json(await createProject(req.body));
});
projectRouter.route("/projects").get(async (req, res) => {
  return res.json(await getProjects());
});
projectRouter.route("/project/:id").get(async (req, res) => {
  return res.json(await getProjectById(req.params.id));
});
projectRouter.route("/project/:id").delete(async (req, res) => {
  return res.json(await deleteProject(req.params.id));
});

projectRouter.route("/gradeable-projects/:userId").get(async (req, res) => {
  try {
    const userId = req.params.userId;
    const projects = await getProjectsUserCanGrade(userId);
    return res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching gradeable projects:", error);
    return res.status(500).send(error.message);
  }
});

projectRouter.route("/project/:id").put(async (req, res) => {
  let ret = await updateProject(req.params.id, req.body);
  if (ret.error) {
    return res.status(400).json({ error: true, msg: ret.msg });
  } else {
    return res.status(200).json(ret.obj);
  }
});

export default projectRouter;
