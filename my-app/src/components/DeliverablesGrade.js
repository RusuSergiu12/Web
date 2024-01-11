import "../components-css/DeliverablesGrades.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";

const DeliverablesGrades = () => {
  const { projectID } = useParams();
  const [deliverables, setDeliverables] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeliverables = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/api/deliverables/${projectID}`
        );

        console.log("API Response:", response);

        if (response.data && Array.isArray(response.data)) {
          setDeliverables(response.data);
        } else {
          console.error("Invalid response format:", response.data);
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
            <div className="deliverable-card" key={deliverable.DeliverableID}>
              <h2>{deliverable.Title}</h2>
              <p>{deliverable.Description}</p>
              <p>
                Due Date: {new Date(deliverable.DueDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No deliverables found.</p>
      )}
    </div>
  );
};

export default DeliverablesGrades;
