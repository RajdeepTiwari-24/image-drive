const express = require("express");
const multer = require("multer");
const path = require("path");

const users = require("../models/userModel");
const router = require("express").Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  
const upload = multer({
    storage: storage,
});

router.post("/upload", upload.single("file"), (req, res) => {
    // console.log(req.body);
    // console.log(req.file);
    const userId = req.body.userid;
    const { filename } = req.file;
    users
      .findOneAndUpdate(
        { _id: userId }, // Assuming userId is the ID of the user
        { $push: { images: filename } }, // Append filename to the images array
        { new: true }
      )
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        console.log(user.images);
        res.json({ image: filename, userId: userId });
      })
      .catch((err) => res.status(500).json({ error: "Internal server error" }));
    // .create({ image: filename, userId: userId })
    // .then((result) => res.json(result))
    // .catch((err) => console.log(err));
    // console.log('ok');
  });
  
 router.get("/getImage", (req, res) => {
    const userId = req.query.userid;
    users
      .findOne({ _id: userId }) // Assuming _id is the unique identifier for users
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
  
        const imageList = user.images.map((image) => ({
          image: image,
          _id: image._id,
        }));
  
        res.json(imageList);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      });
  });
  

  module.exports = router;
