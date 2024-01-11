import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../components-css/DeliverablesGrades.css";

const DeliverablesGrades = () => {
  const { userId, projectID } = useParams();
  const [deliverables, setDeliverables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [selectedDeliverable, setSelectedDeliverable] = useState(null);
  const [grade, setGrade] = useState(1.0);
  const navigate = useNavigate();

  const handleCardClick = (deliverable) => {
    setSelectedDeliverable(deliverable);
    setShowGradeModal(true);
  };

  const handleGradeChange = (event) => {
    setGrade(event.target.value);
  };

  const handleGradeSubmit = async (event) => {
    event.preventDefault();
    const gradeValue = parseFloat(grade);

    if (gradeValue >= 1.0 && gradeValue <= 10.0) {
      try {
        const response = await fetch("http://localhost:9000/api/grade", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            UserID: userId, // Make sure this is the correct field name expected by your API
            DeliverableID: selectedDeliverable.DeliverableID,
            GradeValue: gradeValue,
            GradeDate: new Date().toISOString(),
          }),
        });

        const data = await response.json();
        if (response.ok) {
          // Handle successful response
          setShowGradeModal(false);
          // Additional UI update or state management
        } else {
          // Handle errors in response
          console.error("Failed to submit grade:", data);
        }
      } catch (error) {
        console.error("Error submitting grade:", error);
      }
    } else {
      alert("Please enter a valid grade between 1.00 and 10.00.");
    }
  };

  useEffect(() => {
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

    fetchDeliverables();
  }, [projectID]);

  return (
    <div className="deliverables-container">
      {loading ? (
        <p>Loading...</p>
      ) : deliverables && deliverables.length ? (
        <div className="deliverables-list">
          {deliverables.map((deliverable) => (
            <div
              className="deliverable-card"
              key={deliverable.DeliverableID}
              onClick={() => handleCardClick(deliverable)}
            >
              <h2>{deliverable.Title}</h2>
              <p>{deliverable.Description}</p>
              <p>
                Due Date: {new Date(deliverable.DueDate).toLocaleDateString()}
              </p>
            </div>
          ))}
          <div className="butoane">
            <button id="goBackBtn" onClick={() => navigate(-1)}>
              Go Back
            </button>
          </div>
        </div>
      ) : (
        <p>No deliverables found.</p>
      )}
      {showGradeModal && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close-button"
              onClick={() => setShowGradeModal(false)}
            >
              &times;
            </span>
            <h2>Enter Grade for {selectedDeliverable?.Title}</h2>
            <form onSubmit={handleGradeSubmit}>
              <input
                type="number"
                min="1.00"
                max="10.00"
                step="0.01"
                value={grade}
                onChange={handleGradeChange}
                required
              />
              <button type="submit">Submit Grade</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliverablesGrades;
