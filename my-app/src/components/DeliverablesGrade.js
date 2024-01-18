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
  const [isEditingGrade, setIsEditingGrade] = useState(false);

  const navigate = useNavigate();

  const handleGradeEditClick = async (deliverable) => {
    try {
      const gradeDeadlineResponse = await fetch(
        `http://localhost:9000/api/permissions/deadline/${userId}/${projectID}`
      );
      const { GradeModificationDeadline } = await gradeDeadlineResponse.json();
      const deadline = new Date(GradeModificationDeadline);
      const now = new Date();

      const hasGradedResponse = await fetch(
        `http://localhost:9000/api/hasGraded?userId=${userId}&deliverableId=${deliverable.DeliverableID}`
      );
      const { hasGraded } = await hasGradedResponse.json();

      if (hasGraded && now < deadline) {
        setSelectedDeliverable(deliverable);
        setIsEditingGrade(true);
        setShowGradeModal(true);
      } else {
        alert("You cannot edit the grade for this deliverable.");
      }
    } catch (error) {
      console.error("Error checking grade status or deadline:", error);
    }
  };

  const handleGradeUpdate = async (event) => {
    event.preventDefault();
    const gradeValue = parseFloat(grade);

    if (gradeValue >= 1.0 && gradeValue <= 10.0) {
      const deliverableId = selectedDeliverable.DeliverableID;
      try {
        const response = await fetch(
          `http://localhost:9000/api/grade/${userId}/${deliverableId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              GradeValue: gradeValue,
              GradeDate: new Date().toISOString(),
            }),
          }
        );

        if (response.ok) {
          resetModal();

          setShowGradeModal(false);
          const newGradesResponse = await fetch(
            "http://localhost:9000/api/grades"
          );
          const newGradesData = await newGradesResponse.json();
          setGradesData(newGradesData);
        } else {
          console.error("Failed to update grade:", await response.json());
        }
      } catch (error) {
        console.error("Error updating grade:", error);
      }
    } else {
      alert("Please enter a valid grade between 1.00 and 10.00.");
    }
  };

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

  const resetModal = () => {
    setShowGradeModal(false);
    setIsEditingGrade(false);
    setSelectedDeliverable(null);
    setGrade(1.0);
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
              <button
                id="goBackBtn"
                onClick={() => handleGradeEditClick(deliverable)}
              >
                Edit Grade
              </button>
              <button
                id="goBackBtn"
                onClick={() => handleCardClick(deliverable, gradesData)}
              >
                {" "}
                Add Grade
              </button>
            </div>
          ))}
          <div className="butoane">
            <button id="goBackBtn" onClick={() => navigate(-1)}>
              Go Back
            </button>
          </div>
        </div>
      ) : (
        <div className="butoane">
          <button id="goBackBtn" onClick={() => navigate(-1)}>
            No deliverables, go Back
          </button>
        </div>
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
            <form
              onSubmit={isEditingGrade ? handleGradeUpdate : handleGradeSubmit}
            >
              <input
                type="number"
                min="1.00"
                max="10.00"
                step="0.01"
                value={grade}
                onChange={handleGradeChange}
                required
              />
              <button type="submit">
                {isEditingGrade ? "Update Grade" : "Submit Grade"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliverablesGrades;
