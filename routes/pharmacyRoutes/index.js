import express from "express";
import Pharmacy from "../../db/models/pharmacySchema.js";
import checkToken from "../../middlewares/checkToken.js";

const router = express.Router();

//add medicine
router.post("/", checkToken("DOCTOR"), async (req, res) => {
  const body = { ...req.body };
  await Pharmacy.create(body);
  res.status(201).json({ message: "Medicine added successfully!" });
});

//list medicines
router.get("/", checkToken(["DOCTOR", "USER"]), async (req, res) => {
  const medicines = await Pharmacy.find();
  res.status(200).json(medicines);
});

// //list pharmacy by  id
router.get("/:id", checkToken(["DOCTOR", "USER"]), async (req, res) => {
  const { id } = req.params;
  const medicine = await Pharmacy.findById(id);
  res.status(200).json(medicine);
});

export default router;
