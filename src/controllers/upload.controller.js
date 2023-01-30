const { AppError } = require("../helpers/error");
const respone = require("../helpers/response");

const uploadController = () => {
  return (req, res, next) => {
    const files = req.files;
    if (!files) {
      next(new AppError(400, "No file to upload?"));
    }

    // if Windows-OS browsers get error reading this url, change "\\" in the url to "/"
    const urlOfUploadedFiles = [];
    for (let index = 0; index < files.length; index++) {
      files[index].path = files[index].path.replace(/\\/g, "/");
      urlOfUploadedFiles.push(`http://localhost:4000/${files[index].path}`);
    }

    res.status(201).json(respone(urlOfUploadedFiles));
  };
};

module.exports = uploadController;
