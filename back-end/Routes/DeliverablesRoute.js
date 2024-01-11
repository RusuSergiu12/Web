import express from "express";
import {
  getDeliverables,
  getDeliverableById,
  createDeliverable,
  deleteDeliverable,
  updateDeliverable,
  getDeliverablesByProjectID,
  createDeliverableWithProjId,
} from "../DataAccess/DeliverableDA.js";

let deliverableRouter = express.Router();

deliverableRouter.route("/deliverable").post(async (req, res) => {
  return res.status(201).json(await createDeliverable(req.body));
});
deliverableRouter.route("/deliverable/:projectID").post(async (req, res) => {
  try {
    const newDeliverable = await createDeliverableWithProjId(
      req.body,
      req.params.projectID
    );
    return res.status(201).json(newDeliverable);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        error: true,
        message:
          "Unique constraint error: the deliverable could not be created because it violates a unique constraint.",
      });
    } else {
      return res.status(500).json({
        error: true,
        message: "An error occurred while creating the deliverable.",
        details: error.message,
      });
    }
  }
});

deliverableRouter.route("/deliverables").get(async (req, res) => {
  return res.json(await getDeliverables());
});
deliverableRouter.route("/deliverable/:id").get(async (req, res) => {
  return res.json(await getDeliverableById(req.params.id));
});
deliverableRouter.route("/deliverables/:projectID").get(async (req, res) => {
  return res.json(await getDeliverablesByProjectID(req.params.projectID));
});
deliverableRouter.route("/deliverable/:id").delete(async (req, res) => {
  return res.json(await deleteDeliverable(req.params.id));
});
deliverableRouter.route("/deliverable/:id").put(async (req, res) => {
  let ret = await updateDeliverable(req.params.id, req.body);
  if (ret.error) {
    return res.status(400).json({ error: true, msg: ret.msg });
  } else {
    return res.status(200).json(ret.obj);
  }
});

export default deliverableRouter;
