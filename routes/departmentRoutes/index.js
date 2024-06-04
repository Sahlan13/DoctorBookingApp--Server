import express from "express";
import Department from "../../db/models/departmentSchema.js";
import checkToken from "../../middlewares/checkToken.js";
import Doctor from "../../db/models/doctorSchema.js";

const router = express.Router();

//add department
router.post("/", async (req, res) => {
  const body = { ...req.body };

  // Check if a department with the same name already exists
  const existingDepartment = await Department.findOne({ name: body.name });

  // If a department with the same name exists, return an error
  if (existingDepartment) {
    return res
      .status(400)
      .json({ error: "Department with this name already exists" });
  }

  // Create the department
  await Department.create(body);
  res.status(201).json({ message: "Department added successfully!" });
});

//list departments
router.get("/", async (req, res) => {
  const departments = await Department.find();
  res.status(200).json(departments);
});

//list doctors by department id
router.get("/doctor/:id", checkToken(["USER"]), async (req, res) => {
  const { id } = req.params;
  const doctors = await Doctor.find({ department: id });
  res.status(200).json(doctors);
});

export default router;
