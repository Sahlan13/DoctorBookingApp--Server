import express from "express";
import cors from "cors";
import mongoose from "./db/db.js";
import routes from "./routes/index.js";

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.use(routes);

app.listen(3000, () => {
  console.log("App is running @  http://localhost:3000");
});
