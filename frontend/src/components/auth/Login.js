import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StyledForm } from "./StyledForm";

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(user);
  };

  const loginUser = async () => {
    try {
      let requestBody = {
        query: `
          query {
            login(email: "${user.email}", password: "${user.password}") {
              _id
              token
              tokenExpiration
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
        console.log("response.data :: ", response.data);
        localStorage.setItem("auth", JSON.stringify(response.data.login));
        navigate("/events");
      } else {
        alert(response.errors[0].message)
      }
    } catch (err) {
      console.log('err in loginUser : ', err);
    }
  }

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Login</h2>
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
          {/* {auth.loginStatus === "pending" ? "Submitting..." : "Login"} */}
          Submit
        </button>
        {/* {auth.loginStatus === "rejected" ? <p>{auth.loginError}</p> : null} */}

        <p>Don't have an account ? <Link to='/register'>click here</Link></p>
      </StyledForm>
    </>
  );
};

export default Login;