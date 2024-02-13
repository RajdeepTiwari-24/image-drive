const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const app = express();
const authRoutes = require("./routes/auth");
require("dotenv").config();
const users = require("./models/userModel");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/auth", authRoutes);

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

app.post("/upload", upload.single("file"), (req, res) => {
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

app.get("/getImage", (req, res) => {
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

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
