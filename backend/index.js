import express from "express";
import * as dotenv from "dotenv";
import { createConnection } from "mysql";
import cors from "cors";
import multer from "multer";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images/");
  },
  filename: (req, file, callback) => {
    const [name, extension] = file.originalname.split(".");
    callback(null, `${Date.now()}${name.slice(0, 50)}.${extension}`);
  },
});
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({ storage });

dotenv.config();

let convertPath = (windowsPath) =>
  windowsPath
    .replace(/^\\\\\?\\/, "")
    .replace(/\\/g, "/")
    .replace(/\/\/+/g, "/");

const db = createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: "",
  database: process.env.DATA_BASE,
});

app.use(express.json());
app.use(cors());

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

app.post("/books", upload.single("cover"), async (req, res) => {
  const query =
    "INSERT INTO `books`( `title`, `desc`, `price`, `cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    JSON.parse(req.body.price),
    `${convertPath(req.file.path)}`,
  ];
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

app.delete("/all-book", (req, res) => {
  const query = "DELETE FROM `books`";
  const id = req.query.id;
  db.query(query, id, (err, data) => {
    if (err) return res.status(500).send("something went wrong");
    return res.status(200).send("records successfully deleted");
  });
});

app.get("/images/:path", (req, res) => {
  res.sendFile(__dirname + "/images/" + req.params.path);
});

app.put("/:bookId", (req, res) => {
  try {
    console.log(req.body);
    const getBookQuery = "SELECT `cover` FROM `books` WHERE `id`=?";
    const id = req.params.bookId;
    if (req.body.cover) {
      db.query(getBookQuery, id, (err, data) => {
        fs.unlinkSync(data[0].cover);
      });
    }
    const { title, desc, price } = req.body;
    console.log(
      [title, desc, price]
        .filter((ele) => ele)
        .map((ele) => `${ele}=`)
        .concat()
    );
    const query =
      "UPDATE `books` SET `title`=?, `desc`=?, `price`=? WHERE `id`=?";
    const values = [
      req.body.title,
      req.body.desc,
      JSON.parse(req.body.price),
      req.params.bookId,
    ];
    db.query(query, values, (err, data) => {
      if (err) return res.status(500).send("something went wrong");
      return res.status(200).send("records successfully deleted");
    });
  } catch (error) {
    res.status(500).send("something went wrong");
  }
});

app.listen(8080, () => {
  console.log("server is running");
});
