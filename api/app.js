import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {
  getBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook
} from './controller/bookController.js';


dotenv.config();
const app = express();
const router = express.Router();

const PORT = process.env.PORT || 3200;
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

router.get("/api/books", getBooks);
router.get("/api/books/:id", getBook);
router.post("/api/books", addBook);
router.put("/api/books/:id", updateBook);
router.delete("/api/books/:id", deleteBook);

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});