import express from "express";
import * as dotenv from "dotenv";
import mysql from "mysql";

dotenv.config();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: "",
  database: process.env.database,
});

const app = express();

app.get("/", (req, res) => {
  return res.status(200).send("Hello world");
});

app.get("/books", (req, res) => {
  const query = "SELECT * FROM books";
  db.query(query, (err, data) => {
    if (err) return res.status(500).send("something went wrong");
    return res.status(200).json(data);
  });
});

app.post("/books", (req, res) => {
  const query = "INSET INTO book (`title`, `desc`, `cover`) VALUES(?)";
  const values = ["title", "desc", "cover"];
  db.query(query, [values], (err, data) => {
    if (err) return res.status(500).send("something went wrong");
    return res.status(200).json(data);
  });
});

app.listen(8080, () => {
  console.log("server is running");
});
