import express from "express";
import {
  getPermissions,
  getPermissionById,
  createPermission,
  deletePermission,
  updatePermission,
  getUserPermission,
} from "../DataAccess/PermissionDA.js";

let permissionRouter = express.Router();

permissionRouter.route("/permission").post(async (req, res) => {
  return res.status(201).json(await createPermission(req.body));
});
permissionRouter.route("/permissions").get(async (req, res) => {
  return res.json(await getPermissions());
});
permissionRouter.route("/permission/user/:id").get(async (req, res) => {
  return res.json(await getUserPermission(req.params.id));
});
permissionRouter.route("/permission/:id").get(async (req, res) => {
  return res.json(await getPermissionById(req.params.id));
});
permissionRouter.route("/permission/:id").delete(async (req, res) => {
  return res.json(await deletePermission(req.params.id));
});
permissionRouter.route("/permission/:id").put(async (req, res) => {
  let ret = await updatePermission(req.params.id, req.body);
  if (ret.error) {
    return res.status(400).json({ error: true, msg: ret.msg });
  } else {
    return res.status(200).json(ret.obj);
  }
});

export default permissionRouter;
