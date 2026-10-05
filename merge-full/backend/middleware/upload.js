import multer from "multer";
//multer takes the image from fe and sends to be
//we get only image file

const storage = multer.memoryStorage(); //7temp saving

const upload = multer({
  storage: storage,
  limits: {          //filesize
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (req, file, callback) => { //check the adde file
    if (file.mimetype.startsWith("image/")) { //mimetype is media type
      callback(null, true);              //jpeg, png, webp
    } else {
      callback(new Error("Only image files allowed"));
    }
  }
});

export default upload;