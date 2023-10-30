const filemodel = require("../models/file");

//localfileupload = handler function

exports.localFileUpload = async (req, res)=>{
    try{

        //fetch file
        const file = req.files.file;
        console.log("file is here",file);

        // server ke path jha file rakhna hai
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("path is = " ,path);
        
        file.mv(path, (err)=>{
            console.log(err)
        })

        res.json({
            seccess:true,
            message:'local file uploaded successfully'
        });
    }catch(err){
        console.log("not able to upload file on server")
        console.log(err);
    }
}