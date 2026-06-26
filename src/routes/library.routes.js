import { Router } from "express";
import { addBook, deleteBook, getBooks } from "../controllers/libraryController.js";
import { upload } from "../middleware/libraryMidlewaree.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const libraryRoutes = Router();

libraryRoutes.post(
  "/add/:docType",
  upload.array("images", 5),
  addBook
);
libraryRoutes.get("/get/:docType",verifyToken, getBooks);
libraryRoutes.delete("/delete/:id", verifyToken,deleteBook);

export default libraryRoutes;