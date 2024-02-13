import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

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
      .get(`http://localhost:5000/getImage?userid=${getuser}`)
      .then((res) => {
        const imageData = Array.isArray(res.data) ? res.data : [];
        setImages(imageData);
      })
      .catch((e) => console.log(e));
    // console.log(reload);
  }, [reload]);

  const handleUpload = (e) => {
    const formdata = new FormData();
    // const getuser = JSON.parse(localStorage.getItem("USER"))._id;
    // console.log(getCurrentChat);
    // console.log(file);
    formdata.append("file", file);
    formdata.append("userid", getuser);
    axios
      .post("http://localhost:5000/upload", formdata)
      .then((res) => setreload((prevReload) => !prevReload))
      .catch((e) => console.log(e));

    // console.log(reload);
    console.log(localStorage.getItem("USER"));
  };
  const handleClick = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Container>
      <div className="top-section">
        <h1>Image Drive</h1>
        <h2>Please Select your file and click Upload.</h2>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleUpload}>Upload</button>
      </div>
      <div className="image-section">
        <h3>The following are the images in your drive:</h3>
        <ul>
          {images.map((image) => (
            <li>
              <img
                key={image.id}
                src={`http://localhost:5000/images/${image.image}`}
                alt=""
              />
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
  background-repeat: no-repeat;
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
    width: 80%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(10px);

    ul {
      /* margin: 0px; */
      overflow: auto;
      max-width: 100%;
      list-style: none;
      li {
        img {
          width: auto;
          height: 100px;
          background-color: white;
          border: 2px solid black;
          margin: 10px auto;
          box-shadow: 4px 4px 5px gray;
        }
      }
    }
    gap: 1rem;
    border: 5px solid black;
    border-radius: 20px;
    padding: 10px;
    margin: auto;
  }

  .logout-btn {
    /* align-self: flex-end; */
    margin-top: auto;
    margin-bottom: 20px;
    width: 50vw;
    background-color: black;
  }

  img {
    height: 120px;
    width: auto;
    border-radius: 5px;
  }
`;
