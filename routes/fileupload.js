const express = require("express");
const router = express.Router();

const {imageUpload, videoUpload, imageReducerUpload, localFileUpload} = require("../Controllers/myfileupload");

//api route

router.post("/localfileupload", localFileUpload);
router.post("/imageupload", imageUpload);
router.post("/videoupload", videoUpload);
router.post("/imagesizereducer", imageReducerUpload);

module.exports = router