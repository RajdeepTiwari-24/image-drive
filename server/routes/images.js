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
    const userId = req.body.userid;
    const { filename } = req.file;
    users
      .findOneAndUpdate(
        { _id: userId }, 
        { $push: { images: filename } }, 
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
  });
  
 router.get("/getImage", (req, res) => {
    const userId = req.query.userid;
    users
      .findOne({ _id: userId }) 
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
  
  router.post("/deleteImage", async (req, res) => {
    console.log("Delete Route");
    try {
      const userId = req.body.userid;
      const imageName = req.body.imagename;
      const user = await users.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.images = user.images.filter(image => image !== imageName);
      await user.save();
      res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  

  module.exports = router;
