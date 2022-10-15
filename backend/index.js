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

app.listen(8080, () => {
  console.log("server is running");
});
