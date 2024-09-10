const multer = require("multer");
const fs = require("fs");
const path = require("path");

exports.multerStorage = (destination) => {
  // Create the destination directory if it doesn't exist
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  // Configure Multer
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destination);
    },

    filename: function (req, file, cb) {
      const imageFile = file.originalname.split(".");
      const extName = imageFile.pop();
      const fileName = imageFile.join(".");

      cb(null, `${fileName}-${Date.now()}.${extName}`);
    },
  });
  const upload = multer({
    storage: storage,
    limits: { fileSize: 512_000_000 },
  });
  return upload;
};
