import React, { useState } from "react";
import "../components-css/DeliverableForm.css";
import { useParams } from "react-router-dom";

const DeliverableForm = ({ onSubmit, onCancel, ProjectID }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ProjectID || isNaN(parseInt(ProjectID))) {
      alert("Invalid Project ID. Please enter a valid Project ID.");
      return;
    }

    const deliverableData = {
      Title: title,
      Description: description,
      DueDate: dueDate,
      ProjectID: parseInt(ProjectID), 
    };

    try {
      const response = await fetch(`http://localhost:9000/api/deliverable`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deliverableData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check if the response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Not a JSON response");
      }

      const addedDeliverable = await response.json();
      onSubmit(addedDeliverable);

      setTitle("");
      setDescription("");
      setDueDate("");
      onCancel();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="deliverable-form">
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
          type="date"
          placeholder="Due Date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button type="submit">Add Deliverable</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default DeliverableForm;
