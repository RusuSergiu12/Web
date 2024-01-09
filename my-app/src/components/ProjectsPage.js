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

  const handleNewProjectSubmit = (newProject) => {
    setShowForm(false);
    setProjectSubmitted(true);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  useEffect(() => {
    const fetchProjects = async () => {
      let url;
      const userType = localStorage.getItem("UserType");

      if (userType === "professor") {
        url = `http://localhost:9000/api/projects`;
      } else {
        url = `http://localhost:9000/api/userProjects/${userId}`;
      }

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          console.error("Data is not an array:", data);
        }
      } catch (error) {
        console.error("Fetching projects failed:", error);
      }
    };

    fetchProjects();
  }, [userId, projectSubmitted]);

  const userType = localStorage.getItem("UserType");
  return (
    <div className="projects-container">
      <div className="projects-list">
        {Array.isArray(projects) &&
          projects.map((project) => (
            <div className="project-card" key={project.ProjectID}>
              <h2>{project.Title}</h2>
              <p>{project.Description}</p>
              <a href={project.VideoLink}>Video Link</a>
              <p></p>
              <a href={project.DeploymentLink}>Deployment Link</a>
              <h3>Final Grade: {project.FinalGrade}</h3>
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
