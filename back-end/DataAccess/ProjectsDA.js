import Project from "../Entities/Projects.js";
import User from "../Entities/Users.js";
import Permission from "../Entities/Permissions.js";

async function getProjects() {
  return await Project.findAll({ include: ["User"] });
}

// function to get a project by id
async function getProjectById(id) {
  return await Project.findByPk(id, { include: ["User"] });
}

async function getProjectsUserCanGrade(userId) {
  try {
    const projects = await Permission.findAll({
      where: { UserID: userId, CanGrade: true },
      include: [
        {
          model: Project,
          as: "Project", 
        },
      ],
    });

    
    return projects.map((permission) => permission.Project);
  } catch (error) {
    console.error("Error in getProjectsUserCanGrade:", error);
    throw error;
  }
}
//function to create a new project
async function createProject(project) {
  return await Project.create(project);
}
//function to delete a project
async function deleteProject(id) {
  let project = await Project.findByPk(id);
  return await project.destroy();
}
//function to update a project
async function updateProject(id, project) {
  try {
    let updateProject = await getProjectById(id);
    if (!updateProject) return { error: true, msg: "No entity found" };
    await updateProject.update(project);
    updateProject = await getProjectById(id);
    return {
      error: false,
      msg: "Project updated successfully",
      obj: updateProject,
    };
  } catch (error) {
    return { error: true, msg: "Error updating project" };
  }
}

export {
  getProjects,
  getProjectById,
  createProject,
  deleteProject,
  updateProject,
  getProjectsUserCanGrade,
};
