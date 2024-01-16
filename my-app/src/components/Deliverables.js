import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DeliverableForm from "./DeliverableForm";
import "../components-css/Deliverables.css";

const Deliverables = () => {
  const { projectID } = useParams();
  const [deliverables, setDeliverables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const fetchDeliverables = async () => {
    try {
      const response = await fetch(
        `http://localhost:9000/api/deliverables/${projectID}`
      );

      const data = await response.json();
      if (Array.isArray(data)) {
        setDeliverables(data);
      } else {
        console.error("Invalid response format:", data);
      }
    } catch (error) {
      console.error("Error fetching deliverables:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliverables();
  }, [projectID]);

  const handleNewDeliverableSubmit = async (formData) => {
    try {
      const response = await fetch(
        `http://localhost:9000/api/deliverable/${projectID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (data) {
        fetchDeliverables();
        setShowForm(false);
      }
    } catch (error) {
      console.error("Error adding deliverable:", error);
    }
  };

  return (
    <div className="deliverables-container">
      {loading ? (
        <p>Loading...</p>
      ) : deliverables && deliverables.length ? (
        <div className="deliverables-list">
          {deliverables.map((deliverable) => (
            <div className="deliverable-card" key={deliverable.DeliverableID}>
              <h2>{deliverable.Title}</h2>
              <p>{deliverable.Description}</p>
              <p>
                Due Date: {new Date(deliverable.DueDate).toLocaleDateString()}
              </p>
            </div>
          ))}
          <div className="butoane">
            <button id="addDeliv" onClick={() => setShowForm(true)}>
              Add New Deliverables
            </button>
            <button id="goBackBtn" onClick={() => navigate(-1)}>
              Go Back
            </button>
          </div>
        </div>
      ) : (
        <p>No deliverables found.</p>
      )}
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <DeliverableForm
              onSubmit={handleNewDeliverableSubmit}
              onCancel={() => setShowForm(false)}
              ProjectID={projectID} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Deliverables;
