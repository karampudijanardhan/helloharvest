import multer from "multer";

console.log("✅ Using memoryStorage");

const upload = multer({
  storage: multer.memoryStorage(),
});

export default upload;