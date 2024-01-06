import "../components-css/LoginSignup.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const LoginSignup = () => {
  const [action, setAction] = useState("Sign Up");

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
      </div>
      <div className="inputs">
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="input">
            <FontAwesomeIcon icon={faEnvelope} className="icons" />
            <input type="email" placeholder="Email" />
          </div>
        )}
        <div className="input">
          <FontAwesomeIcon icon={faUser} className="icons" />
          <input type="text" placeholder="Username" />
        </div>

        <div className="input">
          <FontAwesomeIcon icon={faLock} className="icons" />
          <input type="password" placeholder="Password" />
        </div>
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="input">
            <div className="role-selection">
              <input type="radio" id="student" name="role" value="student" />
              <label htmlFor="student">Student</label>

              <input
                type="radio"
                id="professor"
                name="role"
                value="professor"
              />
              <label htmlFor="professor">Professor</label>
            </div>
          </div>
        )}
      </div>

      <div className="submit-container">
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Login");
          }}
        >
          Already have an account?
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Sign Up");
          }}
        >
          Create Account
        </div>
      </div>
      <button className="submit" id="subBtn">
        {action === "Login" ? "Login" : "Sign Up"}
      </button>
    </div>
  );
};

export default LoginSignup;
