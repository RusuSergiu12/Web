import LoginSignup from "./components/LoginSignup.js";
import ProjectsPage from "./components/ProjectsPage.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginSignup />} />
        <Route exact path="/projects" element={<ProjectsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
