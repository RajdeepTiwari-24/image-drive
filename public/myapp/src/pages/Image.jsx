import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

export default function Image() {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [image,setImage]=useState();
  useEffect(() => {
    if (!localStorage.getItem("USER")) {
      navigate("/login");
    }
  }, []);
  const handleUpload = (e) => {
    const formdata=new FormData();
    formdata.append('file',file);
    axios.post("http://localhost:5000/upload",formdata)
    .then((res)=> console.log(res))
    .catch((e) => console.log(e));
    // console.log(file);
  };
  const handleClick = () => {
    localStorage.clear();
    navigate("/login");
  };
  useEffect(()=>{
    axios.get("http://localhost:5000/getImage")
    .then((res)=> {
      setImage(res.data[0].image)
      console.log(res.data[0].image);
    })
    .catch((e) => console.log(e));
    // console.log(image);
  },[]);

  return (
    <Container>
      {/* <div className="container"> */}
      {/* <div>Image</div> */}
      <div>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleUpload}>Upload</button>
        {/* </div> */}
        <br />
        {/* <h1>{`image`}</h1> */}
        <img src={`http://localhost:5000/images`+image} alt=""/>
        <button onClick={handleClick}>Logout</button>
      </div>
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
