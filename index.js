const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./config/database");
const fileupload = require("express-fileupload");
const cloudinary = require("./config/cloudinary");
const uploadRoute = require("./routes/fileupload");
const fileUploadModel = require("./models/file");

const port = process.env.PORT || 8000;
cloudinary.cloudinaryConnect();

fileUploadModel.sync({force:false})

app.use(express.json())
app.use(fileupload()) // file upload middleware
app.use("/api/v1/upload", uploadRoute);

app.listen(port, ()=>{
    console.log(`app is running on port number ${port}`)
})

// default route
app.get('/', (req, res)=>{
    res.send("hello jii this is default route")
})