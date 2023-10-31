const filemodel = require("../models/file");
const cloudnary = require("cloudinary").v2;
//localfileupload = handler function

// upload file on system
exports.localFileUpload = async (req, res) => {
  try {
    //fetch file
    const file = req.files.file;
    console.log("file is here", file);

    // server ke path jha file rakhna hai
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
    console.log("path is = ", path);

    file.mv(path, (err) => {
      console.log(err);
    });

    res.json({
      seccess: true,
      message: "local file uploaded successfully",
    });
  } catch (err) {
    console.log("not able to upload file on server");
    console.log(err);
  }
};

function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}
async function uploadFileToCloudinary(file, folder , quality) {
  const options = { folder };

  if(quality){
    options.quality = quality
  }

  options.resource_type = "auto";
  return await cloudnary.uploader.upload(file.tempFilePath, options);
}

// image upload on cloudnary
exports.imageUpload = async (req, res) => {
  try {
    // data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    //validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "file format not supported",
      });
    }

    //is file formate suppported

    const respone = await uploadFileToCloudinary(file, "naveenCode");
    console.log(respone);
    //save entry on database

    const fileData = await filemodel.create({
      name,
      imageUrl: respone.secure_url,
      tags,
      email,
    });

    res.json({
      success: true,
      imageUrl: respone.secure_url,
      message: "image successfuly uploaded",
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};

exports.videoUpload = async (req, res) => {
  try {
    //data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.videoFile;

    //validation
    const supportedTypes = ["mp4", "mov"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("file Type", fileType);
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "file format not supported",
      });
    }
    // upload file to cloudinary
    const respone = await uploadFileToCloudinary(file, "naveenCode");
    console.log(respone);

    //save entry on database

    const fileData = await filemodel.create({
      name,
      imageUrl: respone.secure_url,
      tags,
      email,
    });

    res.json({
      success: true,
      videoUrl: respone.secure_url,
      message: "video successfuly uploaded",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.imageReducerUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    //validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "file format not supported",
      });
    }

    //is file with quality value

    const respone = await uploadFileToCloudinary(file, "naveenCode", 30);
    console.log(respone);
    //save entry on database

    const fileData = await filemodel.create({
      name,
      imageUrl: respone.secure_url,
      tags,
      email,
    });

    res.json({
      success: true,
      imageUrl: respone.secure_url,
      message: "image successfuly uploaded",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
