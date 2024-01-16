import Deliverable from "../Entities/Deliverables.js";

async function getDeliverables() {
  return await Deliverable.findAll({ include: ["Grades"] });
}

//get deliverables by ProjectID
async function getDeliverablesByProjectID(projectID) {
  return await Deliverable.findAll({
    where: { ProjectID: projectID },
    include: ["Grades"],
  });
}

// function to get a deliverable by id
async function getDeliverableById(id) {
  return await Deliverable.findByPk(id);
}
//function to create a new deliverable
async function createDeliverable(deliverable) {
  return await Deliverable.create(deliverable);
}
//function to delete a deliverable
async function deleteDeliverable(id) {
  let deliverable = await Deliverable.findByPk(id);
  return await deliverable.destroy();
}
async function createDeliverableWithProjId(deliverable, projectID) {
  try {
    
    deliverable.ProjectID = projectID;

    
    const createdDeliverable = await Deliverable.create(deliverable);

    return createdDeliverable;
  } catch (error) {
    
    throw error;
  }
}

//function to update a deliverable
async function updateDeliverable(id, deliverable) {
  try {
    let updateDeliverable = await getDeliverableById(id);
    if (!updateDeliverable) return { error: true, msg: "No entity found" };
    await updateDeliverable.update(deliverable);
    updateDeliverable = await getDeliverableById(id);
    return {
      error: false,
      msg: "Deliverable updated successfully",
      obj: updateDeliverable,
    };
  } catch (error) {
    return { error: true, msg: "Error updating deliverable" };
  }
}

export {
  getDeliverables,
  getDeliverableById,
  createDeliverable,
  deleteDeliverable,
  updateDeliverable,
  getDeliverablesByProjectID,
  createDeliverableWithProjId,
};
