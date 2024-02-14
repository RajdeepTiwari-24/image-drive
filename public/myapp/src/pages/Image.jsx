import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { uploadimagesRoute, getimagesRoute, deleteRoute } from "../utils/APIRoutes";

export default function Image() {
  const navigate = useNavigate();
  const getuser = JSON.parse(localStorage.getItem("USER"))._id;
  const [file, setFile] = useState();
  const [images, setImages] = useState([]);
  const [reload, setreload] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("USER")) {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    axios
      .get(`${getimagesRoute}?userid=${getuser}`)
      .then((res) => {
        const imageData = Array.isArray(res.data) ? res.data : [];
        setImages(imageData);
      })
      .catch((e) => console.log(e));
    // console.log(reload);
  }, [reload]);

  const handleUpload = (e) => {
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("userid", getuser);
    axios
      .post(uploadimagesRoute, formdata)
      .then((res) => setreload((prevReload) => !prevReload))
      .catch((e) => console.log(e));

    // console.log(reload);
    console.log(localStorage.getItem("USER"));
  };
  const handleClick = () => {
    localStorage.clear();
    navigate("/login");
  };

  const deleteClick=(imagename)=>{
    console.log("Delete Clicked");
    axios
    .post(deleteRoute, { userid: getuser, imagename: imagename })
    .then((res) => {
      setreload((prevReload) => !prevReload);
      alert(res.data.message);
    })
    .catch((e) => console.log(e));
  }

  return (
    <Container>
      <div className="top-section">
        <h1>Image Drive</h1>
        <h2>Please Select your file and click Upload.</h2>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleUpload}>Upload</button>
      </div> 
      <h3>The following are the images in your drive:</h3>
      <div className="image-section">
        <ul>
          {images.map((image) => (
            <li>
              <img
                key={image.id}
                src={`http://localhost:5000/images/${image.image}`}
                alt=""
              />
              <button onClick={() => deleteClick(image.image)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button className="logout-btn" onClick={handleClick}>
        Logout
      </button>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: relative;
  background-image: url("https://img.freepik.com/free-vector/neumorphic-round-shape-design-empty-white-banner_1017-43171.jpg?w=1380&t=st=1707828356~exp=1707828956~hmac=463bffd3b2c0102d76ec1f6a0892cd0eaec094e886360509f679bb5b51fd2892");
  background-repeat: repeat-y;
  background-size: cover;
  .top-section {
    width: 700px;
    padding: 25px;
    border: 2px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-top: 20px;
    backdrop-filter: blur(10px);
  }

  button {
    color: white;
    background-color: black;
    border: none;
    border-radius: 5px;
    font-size: 1.5rem;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: black;
    }
  }
  .image-section {
    width: 90%;
    height: auto;
    border: 10px solid black;
    min-height: 50%;
    ul{
      list-style:none;
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 1rem;
      width: 80%;
      margin: auto;
      padding: 1.5rem;
      flex-wrap: wrap;
      li{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
      }
    }
  }

  .logout-btn {
    /* align-self: flex-end; */
    margin-top: auto;
    margin-bottom: 20px;
    width: 50vw;
    background-color: black;
  }

  img {
    height: 10rem;
    width: auto;
    border-radius: 5px;
  }
`;
