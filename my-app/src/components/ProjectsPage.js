import "../components-css/ProjectsPage.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectFrom.js";
import GiveGrades from "./GiveGrades.js";

const ProjectsPage = () => {
  const { userId } = useParams();
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [projectSubmitted, setProjectSubmitted] = useState(false);

  const navigate = useNavigate();

  const goToGiveGrades = () => {
    navigate("/give-grades/" + userId + "");
  };
  const fetchDeliverables = async () => {
    const response = await fetch("http://localhost:9000/api/deliverables");
    const deliverables = await response.json();
    const deliverableMap = {};

    deliverables.forEach((deliverable) => {
      if (!deliverableMap[deliverable.projectId]) {
        deliverableMap[deliverable.projectId] = [];
      }
      deliverableMap[deliverable.projectId].push(deliverable.deliverableId);
    });

    return deliverableMap;
  };

  const calculateAverageGrade = (grades) => {
    if (grades.length <= 2) return "N/A"; // Not enough grades to exclude the lowest and highest
    const sortedGrades = grades.sort((a, b) => a - b);
    // Remove the lowest and highest grade
    sortedGrades.pop();
    sortedGrades.shift();
    // Calculate the average of the remaining grades
    const sum = sortedGrades.reduce(
      (accumulator, current) => accumulator + current,
      0
    );
    return (sum / sortedGrades.length).toFixed(2);
  };

  const navigateToDeliverables = (projectId) => {
    navigate(`/deliverables/${projectId}`);
  };

  const handleNewProjectSubmit = (newProject) => {
    setShowForm(false);
    setProjectSubmitted(true);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  useEffect(() => {
    const fetchDeliverablesAndGrades = async () => {
      const userType = localStorage.getItem("UserType");
      const projectsUrl =
        userType === "professor"
          ? `http://localhost:9000/api/projects`
          : `http://localhost:9000/api/userProjects/${userId}`;

      try {
        // Fetch projects and deliverables
        const [projectsResponse, deliverablesResponse] = await Promise.all([
          fetch(projectsUrl),
          fetch("http://localhost:9000/api/deliverables"),
        ]);
        const projectsData = await projectsResponse.json();
        const deliverablesData = await deliverablesResponse.json();

        // Initialize a map to collect grades for each project
        const projectGradesMap = {};

        // Loop through deliverables to collect grades
        deliverablesData.forEach((deliverable) => {
          const projectId = deliverable.ProjectID;
          if (!projectGradesMap[projectId]) {
            projectGradesMap[projectId] = [];
          }
          // Add all grade values to the project's grades array, converting them to numbers
          projectGradesMap[projectId].push(
            ...deliverable.Grades.map((g) => parseFloat(g.GradeValue))
          );
        });

        // Calculate average grade for each project
        const projectsWithGrades = projectsData.map((project) => {
          const grades = projectGradesMap[project.ProjectID] || [];
          project.FinalGrade = calculateAverageGrade(grades);
          return project;
        });

        setProjects(projectsWithGrades);
      } catch (error) {
        console.error("Fetching projects or deliverables failed:", error);
      }
    };

    fetchDeliverablesAndGrades();
  }, [userId, projectSubmitted]);
  const userType = localStorage.getItem("UserType");
  return (
    <div className="projects-container">
      <div className="projects-list">
        {Array.isArray(projects) &&
          projects.map((project) => (
            <div
              className="project-card"
              key={project.ProjectID}
              onClick={() => navigateToDeliverables(project.ProjectID)}
            >
              <h2>{project.Title}</h2>
              <p>{project.Description}</p>
              <a href={project.VideoLink}>Video Link</a>
              <p></p>
              <a href={project.DeploymentLink}>Deployment Link</a>
              {userType === "professor" && (
                <h3>Final Grade: {project.FinalGrade}</h3>
              )}
            </div>
          ))}
      </div>
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <ProjectForm
              onSubmit={handleNewProjectSubmit}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
      {userType !== "professor" && (
        <div className="butoane">
          <button id="addBtn" onClick={toggleForm}>
            Add New Project
          </button>
          <button id="giveGrades" onClick={goToGiveGrades}>
            Grade colleagues
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
