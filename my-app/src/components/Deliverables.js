import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Deliverables = () => {
  const { projectID } = useParams();
  const [deliverables, setDeliverables] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeliverables = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/api/deliverables/${projectID}`);
       
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
    <div>
      <h1>Deliverables</h1>
      {loading ? (
        <p>Loading...</p>
      ) : deliverables && deliverables.length ? (
        <ul>
          {deliverables.map((deliverable) => (
            <li key={deliverable.DeliverableID}>
              <h2>{deliverable.Title}</h2>
              <p>{deliverable.Description}</p>
              <p>Due Date: {new Date(deliverable.DueDate).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No deliverables found.</p>
      )}
    </div>
  );
};

export default Deliverables;
