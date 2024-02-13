const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer=require("multer");
const path=require("path");
const app = express();
const authRoutes = require("./routes/auth");
require("dotenv").config();
const images=require('./models/image')
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
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

const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'public/images')
  },
  filename:(req,file,cb)=>{
    cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
  }
})

const upload=multer({
  storage:storage
})

app.post('/upload',upload.single('file'), async(req,res)=>{
  await images.create({image:req.file.filename});
  console.log('ok');
})

app.get('/getImage',async(req,res)=>{
  console.log('aa gye');
  const img=await images.find();
  console.log(img);
})

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
