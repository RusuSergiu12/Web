import express from "express";
import {
  getGrades,
  getGradeById,
  createGrade,
  deleteGrade,
  updateGrade,
  hasUserGradedDeliverable,
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
gradeRouter.get("/hasGraded", async (req, res) => {
  try {
    const { userId, deliverableId } = req.query;
    const hasGraded = await hasUserGradedDeliverable(userId, deliverableId);
    res.json({ hasGraded });
  } catch (error) {
    res.status(500).json({ error: true, msg: "Error checking grade status" });
  }
});

export default gradeRouter;
