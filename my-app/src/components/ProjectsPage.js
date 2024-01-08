import "../components-css/ProjectsPage.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProjectForm from "./ProjectFrom.js";

const ProjectsPage = () => {
  const { userId } = useParams();
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [projectSubmitted, setProjectSubmitted] = useState(false);

  const handleNewProjectSubmit = (newProject) => {
    setShowForm(false);
    setProjectSubmitted(true);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `http://localhost:9000/api/userProjects/${userId}`
        );
        const data = await response.json();
        console.log("API Response:", data);
        if (Array.isArray(data)) {
          setProjects(data);
          setProjectSubmitted(false); // Reset projectSubmitted to false after refetching
        } else {
          console.error("Data is not an array:", data);
        }
      } catch (error) {
        console.error("Fetching projects failed:", error);
      }
    };

    fetchProjects();
  }, [userId, projectSubmitted]); // Include projectSubmitted in the dependencies array

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
      <button id="addBtn" onClick={toggleForm}>
        Add New Project
      </button>{" "}
    </div>
  );
};

export default ProjectsPage;
