import "../components-css/Deliverables.css";
import { useParams, useNavigate } from "react-router-dom";

const Deliverables = () => {
  const { projectID } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Deliverables</h1>
    </div>
  );
};

export default Deliverables;
