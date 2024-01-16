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
  const [gradesData, setGradesData] = useState([]);
  const [gradedDeliverableIds, setGradedDeliverableIds] = useState([]);

  const navigate = useNavigate();

  const handleCardClick = async (deliverable) => {
    try {
      const response = await fetch(
        `http://localhost:9000/api/hasGraded?userId=${userId}&deliverableId=${deliverable.DeliverableID}`
      );
      const { hasGraded } = await response.json();

      if (hasGraded) {
        alert("You have already graded this deliverable.");
      } else {
        setSelectedDeliverable(deliverable);
        setShowGradeModal(true);
      }
    } catch (error) {
      console.error("Error checking grade status:", error);
    }
  };

  const handleGradeChange = (event) => {
    setGrade(event.target.value);
  };

  const handleGradeSubmit = async (event) => {
    event.preventDefault();
    const gradeValue = parseFloat(grade);

    if (gradeValue >= 1.0 && gradeValue <= 10.0) {
      const deliverableId = selectedDeliverable.DeliverableID;
      if (gradedDeliverableIds.includes(deliverableId)) {
        alert("You have already graded this deliverable.");
      } else {
        try {
          const response = await fetch("http://localhost:9000/api/grade", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              UserID: userId,
              DeliverableID: selectedDeliverable.DeliverableID,
              GradeValue: gradeValue,
              GradeDate: new Date().toISOString(),
            }),
          });

          const data = await response.json();
          if (response.ok) {
            
            setShowGradeModal(false);
            setGradedDeliverableIds([...gradedDeliverableIds, deliverableId]);
            const newGradesResponse = await fetch(
              "http://localhost:9000/api/grades"
            );
            const newGradesData = await newGradesResponse.json();
            setGradesData(newGradesData);
           
          } else {
            
            console.error("Failed to submit grade:", data);
          }
        } catch (error) {
          console.error("Error submitting grade:", error);
        }
      }
    } else {
      alert("Please enter a valid grade between 1.00 and 10.00.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const deliverablesResponse = await fetch(
          `http://localhost:9000/api/deliverables/${projectID}`
        );
        const gradesResponse = await fetch("http://localhost:9000/api/grades");

        const [deliverablesData, gradesData] = await Promise.all([
          deliverablesResponse.json(),
          gradesResponse.json(),
        ]);

        
        const userGradedDeliverablesIds = gradesData
          .filter((grade) => grade.UserID === userId)
          .map((grade) => grade.DeliverableID);

        
        setGradedDeliverableIds(userGradedDeliverablesIds);

        
        if (Array.isArray(deliverablesData)) {
          const deliverablesWithGradingStatus = deliverablesData.map(
            (deliverable) => ({
              ...deliverable,
              hasGraded: userGradedDeliverablesIds.includes(
                deliverable.DeliverableID
              ),
            })
          );
          setDeliverables(deliverablesWithGradingStatus);
        } else {
          console.error(
            "Invalid response format for deliverables:",
            deliverablesData
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectID, userId]);

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
              onClick={() => handleCardClick(deliverable, gradesData)}
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
