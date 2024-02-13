import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

export default function Image() {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [images,setImages]=useState([]);
  const [reload,setreload]= useState(false);
  useEffect(() => {
    if (!localStorage.getItem("USER")) {
      navigate("/login");
    }
  }, []);
  useEffect(()=>{
    axios.get("http://localhost:5000/getImage")
    .then((res)=> {
      setImages(res.data)
    })
    .catch((e) => console.log(e));
    console.log(reload);
  },[reload]);

  const handleUpload = (e) => {
    const formdata=new FormData();
    formdata.append('file',file);
    axios.post("http://localhost:5000/upload",formdata)
    .then((res)=> setreload(prevReload => !prevReload))
    .catch((e) => console.log(e));
    
    console.log(reload);
  };
  const handleClick = () => {
    localStorage.clear();
    navigate("/login");
  };
 
  return (
    <Container>
      <div className="top-section">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleUpload}>Upload</button>
      </div>
      <div className="image-section">
        {images.map((image) => (
          <img key={image.id} src={`http://localhost:5000/images/${image.image}`} alt=""/>
        ))}
      </div>
      <button className="logout-btn" onClick={handleClick}>Logout</button>
    </Container>
  );
}

  const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: relative;
  
    .top-section {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-top: 20px;
    }
  
    button {
      color: white;
      background-color: #f44336;
      border: none;
      border-radius: 5px;
      font-size: 1.5rem;
      padding: 10px 20px;
      cursor: pointer;
      transition: background-color 0.3s ease;
  
      &:hover {
        background-color: #d32f2f;
      }
    }
  
    .image-section {
      width: 80%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
      border: 10px solid black;
      padding: 10px;
      margin: auto;
    }
  
    .logout-btn {
      align-self: flex-end;
      margin-top: auto;
      margin-bottom: 20px;
    }
  
    img {
      height: 120px;
      width: auto;
      border-radius: 5px;
    }
  `;
  