import { useState } from "react";
import { useParams } from "react-router-dom";
import "../components-css/ProjectForm.css";

const ProjectForm = ({ onSubmit, onCancel }) => {
  const { userId } = useParams(); // This assumes that 'userId' is part of the path in your routing setup
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [deploymentLink, setDeploymentLink] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newProject = {
      Title: title,
      Description: description,
      VideoLink: videoLink,
      DeploymentLink: deploymentLink,
    };

    try {
      // POST the new project to the server
      const response = await fetch("http://localhost:9000/api/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      });

      if (!response.ok) {
        throw new Error("Server responded with an error!");
      }

      // Retrieve the new project's ID from the response
      const createdProject = await response.json();

      // Associate the new project with the user
      const associateResponse = await fetch(
        "http://localhost:9000/api/userProjects",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: parseInt(userId, 10), // Ensure the userId is an integer
            projectId: createdProject.ProjectID,
          }),
        }
      );

      if (!associateResponse.ok) {
        throw new Error("Failed to associate project with user!");
      }

      // Call the onSubmit prop to notify the parent component of the new project
      onSubmit(createdProject);

      // Optionally clear the form fields
      setTitle("");
      setDescription("");
      setVideoLink("");
      setDeploymentLink("");
    } catch (error) {
      console.error("Error:", error);
      // Here you could set an error message in state and display it to the user
    }
  };

  return (
    <div className="project-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="text"
          placeholder="Video Link"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
        />
        <input
          type="text"
          placeholder="Deployment Link"
          value={deploymentLink}
          onChange={(e) => setDeploymentLink(e.target.value)}
        />
        <button type="submit">Add Project</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
