import express from "express";
import {
  getGrades,
  getGradeById,
  createGrade,
  deleteGrade,
  updateGrade,
} from "../DataAccess/GradeDA.js";

let gradeRouter = express.Router();

gradeRouter.route("/grade").post(async (req, res) => {
  return res.status(201).json(await createGrade(req.body));
});
gradeRouter.route("/grades").get(async (req, res) => {
  return res.json(await getGrades());
});
gradeRouter.route("/grade/:id").get(async (req, res) => {
  return res.json(await getGradeById(req.params.id));
});
gradeRouter.route("/grade/:id").delete(async (req, res) => {
  return res.json(await deleteGrade(req.params.id));
});
gradeRouter.route("/grade/:id").put(async (req, res) => {
  let ret = await updateGrade(req.params.id, req.body);
  if (ret.error) {
    return res.status(400).json({ error: true, msg: ret.msg });
  } else {
    return res.status(200).json(ret.obj);
  }
});

export default gradeRouter;
