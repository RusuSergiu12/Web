import Grade from "../Entities/Grades.js";

async function getGrades() {
  return await Grade.findAll();
}

// function to get a grade by id
async function getGradeById(id) {
  return await Grade.findByPk(id);
}
//function to create a new grade
async function createGrade(grade) {
  return await Grade.create(grade);
}
//function to delete a grade
async function deleteGrade(id) {
  let grade = await Grade.findByPk(id);
  return await grade.destroy();
}
//function to update a grade
async function updateGrade(id, grade) {
  try {
    let updateGrade = await getGradeById(id);
    if (!updateGrade) return { error: true, msg: "No entity found" };
    await updateGrade.update(grade);
    updateGrade = await getGradeById(id);
    return {
      error: false,
      msg: "Grade updated successfully",
      obj: updateGrade,
    };
  } catch (error) {
    return { error: true, msg: "Error updating grade" };
  }
}

export { getGrades, getGradeById, createGrade, deleteGrade, updateGrade };
