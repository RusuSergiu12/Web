import Permission from "../Entities/Permissions.js";

async function getPermissions() {
  return await Permission.findAll();
}
// function to get a permission by id
async function getPermissionById(id) {
  return await Permission.findByPk(id);
}
//function to see permision of a user
async function getUserPermission(id) {
  return await Permission.findAll({ where: { UserId: id } });
}
//function to create a new permission
async function createPermission(permission) {
  return await Permission.create(permission);
}
//function to delete a permission
async function deletePermission(id) {
  let permission = await Permission.findByPk(id);
  return await permission.destroy();
}
//function to update a permission
async function updatePermission(id, permission) {
  try {
    let updatePermission = await getPermissionById(id);
    if (!updatePermission) return { error: true, msg: "No entity found" };
    await updatePermission.update(permission);
    updatePermission = await getPermissionById(id);
    return {
      error: false,
      msg: "Permission updated successfully",
      obj: updatePermission,
    };
  } catch (error) {
    return { error: true, msg: "Error updating permission" };
  }
}

export {
  getPermissions,
  getPermissionById,
  getUserPermission,
  createPermission,
  deletePermission,
  updatePermission,
};
