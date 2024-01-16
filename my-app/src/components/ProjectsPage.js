import "../components-css/ProjectsPage.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectFrom.js";

const ProjectsPage = () => {
  const { userId } = useParams();
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [projectSubmitted, setProjectSubmitted] = useState(false);

  const navigate = useNavigate();

  const goToGiveGrades = () => {
    navigate("/give-grades/" + userId + "");
  };

  const calculateAverageGrade = (grades) => {
    if (grades.length <= 2) return "Not graded"; 
    const sortedGrades = grades.sort((a, b) => a - b);
    
    sortedGrades.pop();
    sortedGrades.shift();
   
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
        
        const [projectsResponse, deliverablesResponse] = await Promise.all([
          fetch(projectsUrl),
          fetch("http://localhost:9000/api/deliverables"),
        ]);
        const projectsData = await projectsResponse.json();
        const deliverablesData = await deliverablesResponse.json();

        
        const projectGradesMap = {};

        
        deliverablesData.forEach((deliverable) => {
          const projectId = deliverable.ProjectID;
          if (!projectGradesMap[projectId]) {
            projectGradesMap[projectId] = [];
          }
         
          projectGradesMap[projectId].push(
            ...deliverable.Grades.map((g) => parseFloat(g.GradeValue))
          );
        });

        
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
              onClick={() =>
                userType !== "professor" &&
                navigateToDeliverables(project.ProjectID)
              }
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
