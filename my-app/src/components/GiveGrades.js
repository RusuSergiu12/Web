import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../components-css/GiveGrades.css";

const GiveGrades = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `http://localhost:9000/api/gradeable-projects/${userId}`
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          console.error("Data is not an array:", data);
        }
      } catch (error) {
        console.error("Fetching gradeable projects failed:", error);
      }
    };

    fetchProjects();
  }, [userId]);

  // Function to navigate back to the ProjectsPage
  const goToProjects = () => {
    navigate(`/projects/${userId}`);
  };
  const navigateToDeliverablesGrade = (projectId) => {
    navigate(`/deliverables-grade/${userId}/${projectId}`);
  };

  return (
    <div className="projects-container">
      <div className="projects-list">
        {projects.map((project) => (
          <div
            className="project-card"
            key={project.ProjectID}
            onClick={() => navigateToDeliverablesGrade(project.ProjectID)}
          >
            <h2>{project.Title}</h2>
            <p>{project.Description}</p>
            <a href={project.VideoLink}>Video Link</a>
            <p></p>
            <a href={project.DeploymentLink}>Deployment Link</a>
          </div>
        ))}
      </div>
      <button id="giveGrades" onClick={goToProjects}>
        Back to Projects
      </button>
    </div>
  );
};

export default GiveGrades;
