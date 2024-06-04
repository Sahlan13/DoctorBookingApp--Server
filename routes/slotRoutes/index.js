import express from "express";
import Slot from "../../db/models/slotSchema.js";
import checkToken from "../../middlewares/checkToken.js";
const router = express.Router();

//add slot by doctor --- doctor route

router.post("/", checkToken(["DOCTOR"]), async (req, res) => {
  try {
    const body = [{ ...req.body }];

    // Check for existing slots with the same start and end times
    const existingSlots = await Slot.find({
      $or: body.map(slot => ({
        $and: [{ startTime: slot.startTime }, { endTime: slot.endTime }],
      })),
    });

    // If any existing slots are found, they are duplicates
    if (existingSlots.length > 0) {
      return res.status(400).json({ error: "Duplicate slots found" });
    }

    // Insert the slots into the database
    await Slot.insertMany(body);
    res.status(201).json({ message: "Slots Added!" });
  } catch (error) {
    // Check if the error is a Mongoose validation error
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: errors.join(", ") });
    }
    // For other errors, return a generic error message
    console.error("Error adding slots:", error);
    res.status(500).json({ error: "An error occurred while adding slots" });
  }
});

//list slots of doctor ---user route

router.get("/doctor/:id", checkToken(["DOCTOR", "USER"]), async (req, res) => {
  const { id } = req.params;
  const slots = await Slot.find({ doctor: id });
  res.status(200).json(slots);
});
44;

export default router;
