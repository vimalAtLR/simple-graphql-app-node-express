import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StyledForm } from "./StyledForm";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("handlesubmit :: ", user);
    registerUser(user);
  };

  let registerUser = async (user) => {
    try {
      let requestBody = {
        query: `
          mutation {
            createUser(userInput : {email: "${user.email}", password: "${user.password}"}) {
              _id
              email
            }
          }
        `
      };

      let response = await fetch("http://localhost:7000/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      response = await response.json();

      if (!response.errors && response.data) {
        localStorage.setItem("auth", JSON.stringify(response.data.createUser));
        navigate("/events");
      } else {
        alert(response.errors[0].message)
      }
    } catch (err) {
        console.log('err : ', err);
    }
  }

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="name"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button>
          {/* {auth.rigisterStatus === "pending" ? "Submitting..." : "Register"} */}
          Submit
        </button>
        {/* {auth.registerStatus === "rejected" ? (
          <p>{auth.registerError}</p>
        ) : null} */}
        <p>Already have an account ? <Link to='/login'>click here</Link></p>
      </StyledForm>
    </>
  );
};

export default Register;