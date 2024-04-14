import express from "express";
import Pharmacy from "../../db/models/pharmacySchema.js";
import checkToken from "../../middlewares/checkToken.js";
import Prescription from "../../db/models/prescriptionSchema.js";

const router = express.Router();

//add prescription  by doctor

router.post("/doctor", checkToken(["DOCTOR"]), async (req, res) => {
  const body = { ...req.body };
  const prescriptions = await Prescription.create(body);
  res.status(201).json({ message: "Prescription Added" });
});

//list prescription by appointment id

router.get(
  "/appointment/:id",
  checkToken(["DOCTOR", "USER"]),
  async (req, res) => {
    const { id } = req.params;
    const prescription = await Prescription.find({ appointment: id });
    res.status(200).json(prescription);
  }
);

//list medicines by using medicine ids in precription.medication (prescription.medication is fetched using appoiintment id)

router.get(
  "pharmacy/appointment/:id",
  checkToken(["DOCTOR", "USER"]),
  async (req, res) => {
    const { id } = req.params;
    const prescription = await Prescription.find({ appointment: id });
    const medicines = await Pharmacy.findOne({
      _id: { $in: prescription.medication },
    });
    res.status(200).json(medicines);
  }
);

export default router;
