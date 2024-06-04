import express from "express";
import cors from "cors";
import mongoose from "./db/db.js";
import routes from "./routes/index.js";
import dotenv from "dotenv";
import ejs from "ejs";

dotenv.config({ path: "./.env" });

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.use(routes);

app.listen(process.env.PORT, () => {
  console.log("App is running @  http://localhost:3000");
});
