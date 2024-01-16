import UserProject from "../Entities/UserProjects.js";
import User from "../Entities/Users.js";
import Project from "../Entities/Projects.js";
async function getUserProjects() {
  return await UserProject.findAll();
}
//get by id
async function getUserProjectsById(id) {
  return await UserProject.findByPk(id);
}
//set project to a userId
async function setUserProject(userId, projectId) {
  const user = await User.findByPk(userId);
  const project = await Project.findByPk(projectId);
  await user.addProject(project);
}
async function getUserProjectsByUserId(id) {
  return await User.findByPk(id, {
    include: [
      {
        model: Project,
        as: "Projects",
        required: false, 
        through: {
          attributes: [], 
        },
        attributes: [
          "ProjectID",
          "Title",
          "Description",
          "VideoLink",
          "DeploymentLink",
          "FinalGrade",
        ], 
      },
    ],
  });
}

export {
  getUserProjects,
  getUserProjectsById,
  getUserProjectsByUserId,
  setUserProject,
};
