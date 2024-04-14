import express from "express";
import Doctor from "../../db/models/doctorSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose, { Types } from "mongoose";

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

router.post("/login", async (req, res) => {
  try {
    const body = { ...req.body };
    const doctor = await Doctor.findOne({ username: body.username });
    if (!doctor) {
      return res
        .status(403)
        .json({ message: "Username or Password Incorrect!" });
    }
    const isMatching = await bcrypt.compare(body.password, doctor.password);

    if (!isMatching) {
      return res
        .status(403)
        .json({ message: "Username or Password Incorrect!" });
    }

    const token = jwt.sign(
      { role: "DOCTOR", id: doctor._id },
      process.env.SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    return res
      .status(200)
      .json({ message: "Login successfull!", token: token });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//get doctor details by id
router.get("/profile/:id", async (req, res) => {
  const { id } = req.params;
  // const doctor = await Doctor.findById(id).populate("department");
  const doctor = await Doctor.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        localField: "department",
        from: "departments",
        foreignField: "_id",
        as: "departmentDetails",
      },
    },
    {
      $project: {
        name: 1,
        username: 1,
        image: 1,
        specialization: 1,
        departmentDetails: 1,
      },
    },
  ]);

  res.status(200).json(doctor);
});

export default router;
