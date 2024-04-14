import express from "express";
import Slot from "../../db/models/slotSchema.js";
import checkToken from "../../middlewares/checkToken.js";
const router = express.Router();

//add slot by doctor --- doctor route

router.post("/", checkToken(["DOCTOR"]), async (req, res) => {
  const body = [...req.body];
  await Slot.insertMany(body);
  res.status(201).json({ message: "Slots Added!" });
});

//list slots of doctor ---user route

router.get("/doctor/:id", checkToken(["DOCTOR", "USER"]), async (req, res) => {
  const { id } = req.params;
  const slots = await Slot.find({ doctor: id });
  res.status(200).json(slots);
});

export default router;
