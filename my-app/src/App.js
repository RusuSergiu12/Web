import LoginSignup from "./components/LoginSignup.js";
import ProjectsPage from "./components/ProjectsPage.js";
import GiveGrades from "./components/GiveGrades.js";
import Deliverables from "./components/Deliverables.js";
import DeliverablesGrade from "./components/DeliverablesGrade.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginSignup />} />
        <Route path="/projects/:userId" element={<ProjectsPage />} />
        <Route path="/give-grades/:userId" element={<GiveGrades />} />
        <Route path="/deliverables/:projectID" element={<Deliverables />} />
        <Route
          path="/deliverables-grade/:projectID"
          element={<DeliverablesGrade />}
        />
        <Route
          path="/deliverables-grade/:userId/:projectID"
          element={<DeliverablesGrade />}
        />
        <Route
          path="/deliverables-grade/:userId/:projectId"
          element={<DeliverablesGrade />}
        />
      </Routes>
    </Router>
  );
}

export default App;
