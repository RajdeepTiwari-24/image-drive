import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Image() {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  useEffect(() => {
    if (!localStorage.getItem("USER")) {
      navigate("/login");
    }
  }, []);
  const handleUpload = (e) => {
    console.log(file);
  };
  const handleClick = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Container>
      {/* <div className="container"> */}
      <div>Image</div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      {/* </div> */}
      <button onClick={handleClick}>Logout</button>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  .container {
    height: 85vh;
    width: 85vw;
    // background-color: #00000076;
    backdrop-filter: blur(5px);
    border: 10px solid black;
    // border-radius: 2rem;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
  button {
    color: red;
    font-size: 2rem;
    height: 50px;
  }
`;
