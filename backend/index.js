import express from "express";
import * as dotenv from "dotenv";
import { createConnection } from "mysql";
import cors from "cors";

dotenv.config();

const db = createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: "",
  database: process.env.DATA_BASE,
});

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).send("Hello world");
});

app.get("/books", (req, res) => {
  const query = "SELECT * FROM books";
  db.query(query, (err, data) => {
    console.log(err);
    if (err) return res.status(500).send("something went wrong");
    return res.status(200).json(data);
  });
});

app.post("/books", (req, res) => {
  const query = "INSERT INTO `books`( `title`, `desc`, `cover`) VALUES (?)";
  const values = [req.body.title, req.body.desc, req.body.cover];
  db.query(query, [values], (err, data) => {
    if (err) return res.status(500).send("something went wrong");
    return res.status(200).json("Book successfully added");
  });
});

app.delete("/book", (req, res) => {
  const query = "DELETE FROM `books` WHERE `id`=?";
  const id = req.query.id;
  db.query(query, id, (err, data) => {
    if (err) return res.status(500).send("something went wrong");
    return res.status(200).send("record successfully deleted");
  });
});

app.listen(8080, () => {
  console.log("server is running");
});
