import express from "express";
import userController from "../controllers/userController";
import auth from "../middlewares/auth";
import path from "path";
import multer from "multer";
import productController from "../controllers/productController";

const router = express.Router();

// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: 1000000000, files: 2 },
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Set the filetypes, it is optional
    var filetypes = /jpeg|jpg|png/;
    var mimetype = filetypes.test(file.mimetype);
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }

    cb(
      "Error: File upload only supports the " +
        "following filetypes - " +
        filetypes
    );
  },
});

router.get("/", userController.getUser);
router.post("/create", upload.single("file"), userController.Register);
router.post("/editProfile", auth, userController.editProfile);

router.post("/addProduct", auth, productController.addProduct);
router.post("/listProduct", auth, productController.listProduct);

export default router;
