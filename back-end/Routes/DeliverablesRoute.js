import express from "express";
import {
  getDeliverables,
  getDeliverableById,
  createDeliverable,
  deleteDeliverable,
  updateDeliverable,
} from "../DataAccess/DeliverableDA.js";

let deliverableRouter = express.Router();

deliverableRouter.route("/deliverable").post(async (req, res) => {
  return res.status(201).json(await createDeliverable(req.body));
});
deliverableRouter.route("/deliverables").get(async (req, res) => {
  return res.json(await getDeliverables());
});
deliverableRouter.route("/deliverable/:id").get(async (req, res) => {
  return res.json(await getDeliverableById(req.params.id));
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
