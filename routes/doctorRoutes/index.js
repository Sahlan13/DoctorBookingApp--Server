import express from "express";

const router = express.Router();

router.post("/signup", (req, res) => {
  res.status(201).json({ message: "Signup successfull!" });
});

router.post("/login", (req, res) => {
  res.status(200).json({ message: "Login successfull!" });
});

export default router;
