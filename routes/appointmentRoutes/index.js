import express from "express";
import Appointment from "../../db/models/appointmentSchema.js";
import checkToken from "../../middlewares/checkToken.js";
import Slot from "../../db/models/slotSchema.js";
import User from "../../db/models/userSchema.js";
import nodemailer from "nodemailer";

const router = express.Router();

//list appointments of doctor by doctor id
router.get("/doctor/:id", checkToken(["DOCTOR"]), async (req, res) => {
  const { id } = req.params;
  const appointments = await Appointment.find({ doctor: id }).populate([
    "doctor",
    "user",
    "slot",
  ]);
  res.status(200).json(appointments);
});

//list appointments of user by user id
router.get("/user/:id", checkToken(["USER"]), async (req, res) => {
  const { id } = req.params;
  const appointments = await Appointment.find({ user: id }).populate([
    "doctor",
    "user",
    "slot",
  ]);
  res.status(200).json(appointments);
});

//fetch appointment details by appointment id
router.get(
  "/appointment/:id",
  checkToken(["USER", "DOCTOR"]),
  async (req, res) => {
    const { id } = req.params;
    const appointment = await Appointment.findById(id).populate([
      "doctor",
      "user",
      "slot",
    ]);
    res.status(200).json(appointment);
  }
);

//fetch pdf appointment details by appointment id

router.get("/pdf/:id", checkToken(["USER"]), async (req, res) => {
  const { id } = req.params;
  const appointment = await Appointment.findById(id).populate([
    "doctor",
    "user",
    "slot",
  ]);
  res.render("pdf.ejs", { appointment: appointment });
});

//take appointment

router.post("/", checkToken(["USER"]), async (req, res) => {
  try {
    const body = { ...req.body };
    const slotId = body.slot;
    const userId = body.user;
    const user = await User.findById(userId);
    const appointment = await Appointment.create(body);
    const slot = await Slot.findByIdAndUpdate(slotId, { availability: false });

    const transporter = nodemailer.createTransport({
      // service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "medline061@gmail.com",
        pass: "ucpa qjoe gqbd bswv",
      },
    });
    let mailOptions = {
      from: "medline061@gmail.com",
      to: user.email,
      subject: "Appointment Confirmation Mail",
      text: "Your Appointment have been Confirmed.",
    };
    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Appointment Booked" });
    console.log("email send");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      error: "An error occurred while sending the confirmation email",
    });
  }
});

export default router;
