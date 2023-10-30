const express = require("express");
const router = express.Router();

const {imageUpload, videoUpload, imageReducerUpload, localFileUpload} = require("../Controllers/myfileupload");

//api route

router.post("/localfileupload", localFileUpload);

module.exports = router