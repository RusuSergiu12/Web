import "../components-css/LoginSignup.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const [action, setAction] = useState("Sign Up");
  const navigate = useNavigate();

  const assignStudentPermissions = async (userId) => {
    try {
      const projectsResponse = await fetch(
        `http://localhost:9000/api/userProjects?userId=${userId}`
      );
      const userProjects = await projectsResponse.json();

      const allProjectsResponse = await fetch(
        "http://localhost:9000/api/projects"
      );
      const allProjects = await allProjectsResponse.json();

      const projectsNotPartOf = allProjects.filter(
        (project) =>
          !userProjects.some(
            (userProject) => userProject.ProjectID === project.ProjectID
          )
      );

      if (projectsNotPartOf.length === 0) {
        console.log("User is already part of all projects.");
        return;
      }

      const randomIndex = Math.floor(Math.random() * projectsNotPartOf.length);
      const randomProject = projectsNotPartOf[randomIndex];

      const permissions = {
        CanGrade: true,
        CanModifyGrade: true,
      };

      const currentTime = new Date();
      const gradeModificationDeadline = new Date(currentTime);
      gradeModificationDeadline.setDate(currentTime.getDate() + 3);

      await fetch("http://localhost:9000/api/permission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          UserID: userId,
          ProjectID: randomProject.ProjectID,
          Permissions: permissions,
          CanGrade: true,
          CanModifyGrade: true,
          GradeModificationDeadline: gradeModificationDeadline,
        }),
      });
    } catch (error) {
      console.error("Error in assigning permissions:", error);
    }
  };

  const handleSubmit = async () => {
    const email = document.querySelector('input[type="email"]')?.value;
    const username = document.querySelector('input[type="text"]')?.value;
    const password = document.querySelector('input[type="password"]')?.value;
    let userType;
    if (action !== "Login") {
      userType = document.querySelector('input[name="role"]:checked')?.value;
    }

    if (action === "Login") {
      try {
        const usersResponse = await fetch("http://localhost:9000/api/users");
        if (!usersResponse.ok) {
          throw new Error("Failed to fetch users");
        }
        const users = await usersResponse.json();
        const user = users.find((u) => u.UserName === username);

        if (!user) {
          alert("User not found");
          return;
        }
        const userResponse = await fetch(
          `http://localhost:9000/api/user/${user.UserID}`
        );
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user details");
        }
        const userData = await userResponse.json();

        if (!userData || userData.Password !== password) {
          alert("Invalid username/password");
          return;
        }
        localStorage.setItem("UserType", userData.UserType);
        const userId = user.UserID;
        if (userData.UserType === "student") {
          await assignStudentPermissions(userId);
        }
        navigate(`/projects/${userId}`);
      } catch (error) {
        console.error("Error:", error.message);
      }
    } else {
      try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          alert("Please enter a valid email address");
          return;
        }
        const userTypeRadio = document.querySelector(
          'input[name="role"]:checked'
        );
        if (!userTypeRadio) {
          alert("Please select a user type");
          return;
        }
        userType = userTypeRadio.value;

        const usersResponse = await fetch("http://localhost:9000/api/users");
        if (!usersResponse.ok) {
          throw new Error("Failed to fetch users");
        }
        const users = await usersResponse.json();
        const userExists = users.some(
          (user) => user.UserName === username || user.Email === email
        );

        if (userExists) {
          alert("Username or Email already in use");
          return;
        }

        const newUser = {
          UserName: username,
          Email: email,
          Password: password,
          UserType: userType,
        };

        const response = await fetch("http://localhost:9000/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });

        if (!response.ok) {
          throw new Error("Failed to create user");
        }

        const responseData = await response.json();
        console.log("Response Data:", responseData);

        if (responseData) {
          localStorage.setItem("UserType", newUser.UserType);
          //const userId = responseData.UserID;
          //await assignStudentPermissions(userId);
          alert("User created successfully, please login to continue");
        } else {
          console.error("Failed to create user:", responseData.msg);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  };

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
      <button className="submit" id="subBtn" onClick={handleSubmit}>
        {action === "Login" ? "Login" : "Sign Up"}
      </button>
    </div>
  );
};

export default LoginSignup;
