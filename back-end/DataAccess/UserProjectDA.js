import UserProject from "../Entities/UserProjects.js";

async function getUserProjects() {
  return await UserProject.findAll();
}
//function to update a userProject

export { getUserProjects };
