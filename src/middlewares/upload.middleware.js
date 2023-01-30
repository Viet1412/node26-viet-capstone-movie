const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, res, callback) => {
    callback(null, "./static");
  },

  filename: (req, file, callback) => {
    const prefix = `${new Date()
      .toGMTString()
      .slice(5)
      .replace(/ |:/g, "-")}-${Math.round(Math.random() * 1e8)}`;
    callback(null, `${prefix}-${file.originalname}`);
  },
});

const uploadMiddleware = multer({ storage });
module.exports = uploadMiddleware;
