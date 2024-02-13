import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  useEffect(() => {
    if (localStorage.getItem("USER")) {
      navigate("/image");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      alert("Email and Password is required.");
      return false;
    } else if (password === "") {
      alert("Email and Password is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    console.log("Form Submitted Login");
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        alert(data.msg);
      }
      if (data.status === true) {
        localStorage.setItem("USER", JSON.stringify(data.user));

        navigate("/image");
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <h1>Image Drive</h1>
            <h2>LOGIN</h2>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/register">Create One.</Link>
          </span>
        </form>
      </FormContainer>
    </>
  );
}

const FormContainer = styled.div`
  * {
    margin: 0px;
    padding: 0px;
  }
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  /* background-color: #edf7b5; */
  background-image: url("https://img.freepik.com/free-vector/neumorphic-round-shape-design-empty-white-banner_1017-43171.jpg?w=1380&t=st=1707828356~exp=1707828956~hmac=463bffd3b2c0102d76ec1f6a0892cd0eaec094e886360509f679bb5b51fd2892");
  background-repeat: no-repeat;
  background-size: cover;
  .brand {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    h1 {
      color: black;
      //text-transform: uppercase;
      font-size: 5rem;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    /* background-color: #f5f5f5; */
    backdrop-filter: blur(5px);
    border: 10px solid black;
    border-radius: 2rem;
    padding: 5rem;
  }
  input {
    background-color: #00ffffff;
    padding: 1rem;
    border: 0.2rem solid black;
    border-radius: 0.4rem;
    color: black;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.125rem solid black;
      outline: none;
    }
  }
  button {
    background-color: black;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: black;
    }
  }
  span {
    color: black;
    text-transform: uppercase;
    margin: 1px auto;
    font-weight: 800;
    a {
      color: blue;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
