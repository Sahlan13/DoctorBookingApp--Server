import express from "express";
import Appointment from "../../db/models/appointmentSchema.js";
import checkToken from "../../middlewares/checkToken.js";
import Slot from "../../db/models/slotSchema.js";

const router = express.Router();

//list appointments of doctor by doctor id

router.get("/doctor/:id", checkToken(["DOCTOR"]), async (req, res) => {
  const { id } = req.params;
  const appointments = await Appointment.find({ doctor: id });
  res.status(200).json(appointments);
});

//list appointments of user by user id

router.get("/user/:id", checkToken(["USER"]), async (req, res) => {
  const { id } = req.params;
  const appointments = await Appointment.find({ user: id });
  res.status(200).json(appointments);
});

//take appointment

router.post("/", checkToken(["USER"]), async (req, res) => {
  const body = { ...req.body };
  const slotId = body.slot;
  const appointment = await Appointment.create(body);
  const slot = await Slot.findByIdAndUpdate(slotId, { availability: false });
  res.status(201).json({ message: "Appointment Booked" });
});

export default router;
