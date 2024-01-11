import "../components-css/DeliverablesGrades.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
const DeliverablesGrades = () => {
  const { projectID } = useParams();
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/api/grades`);
        setGrades(response.data);
      } catch (error) {
        console.error("Error fetching grades:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, []); // No dependencies, fetch once when the component mounts

  return (
    <div>
      <h1>Deliverables Grades</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {grades.map((grade) => (
            <li key={grade.GradeID}>
              <p>User ID: {grade.UserID}</p>
              <p>Deliverable ID: {grade.DeliverableID}</p>
              <p>Grade Value: {grade.GradeValue}</p>
              <p>Grade Date: {new Date(grade.GradeDate).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeliverablesGrades;
