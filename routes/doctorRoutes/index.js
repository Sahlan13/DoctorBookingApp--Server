import express from "express";
import Doctor from "../../db/models/doctorSchema.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const body = { ...req.body };
    const doctor = await Doctor.findOne({ username: body.username });
    if (doctor) {
      return res.status(403).json({ message: "Username Already Exists!" });
    }
    if (body.password !== body.confirmPassword) {
      return res.status(403).json({ message: "Passwords does not match!" });
    }

    const hashedPassword = await bcrypt.hash(body.password, 2);
    body.password = hashedPassword;

    await Doctor.create(body);

    return res.status(201).json({ message: "Signup successfull!" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/login", (req, res) => {
  res.status(200).json({ message: "Login successfull!" });
});

export default router;
