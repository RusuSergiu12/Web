import express from "express";
import {
  getUserProjects,
  getUserProjectsById,
  getUserProjectsByUserId,
  setUserProject,
} from "../DataAccess/UserProjectDA.js";

let userProjectRouter = express.Router();

userProjectRouter.route("/userProjects").get(async (req, res) => {
  return res.json(await getUserProjects());
});
userProjectRouter.route("/userProjects").post(async (req, res) => {
  const { userId, projectId } = req.body;
  await setUserProject(userId, projectId);
  return res.json({ success: true });
});
//get by userid
// userProjectRouter.route("/userProjects/:id").get(async (req, res) => {
//   const id = req.params.id;
//   return res.json(await getUserProjectsById(id));
// });
userProjectRouter.route("/userProjects/:userId").get(async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const userWithProjects = await getUserProjectsByUserId(userId);
    if (userWithProjects) {
      return res.json(userWithProjects.Projects);
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Failed to get user projects:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default userProjectRouter;
