import express from "express";
import {
  getPermissions,
  getPermissionById,
  createPermission,
  deletePermission,
  updatePermission,
  getUserPermission,
  getGradeModificationDeadline,
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
permissionRouter
  .route("/permissions/deadline/:userId/:projectId")
  .get(async (req, res) => {
    try {
      const deadline = await getGradeModificationDeadline(
        req.params.userId,
        req.params.projectId
      );

      if (deadline) {
        return res.status(200).json({ GradeModificationDeadline: deadline });
      } else {
        return res
          .status(404)
          .json({
            error: true,
            msg: "Permission with the specified user and project not found.",
          });
      }
    } catch (error) {
      return res
        .status(500)
        .json({
          error: true,
          msg: "Internal server error",
          details: error.message,
        });
    }
  });

export default permissionRouter;
