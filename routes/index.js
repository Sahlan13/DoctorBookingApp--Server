import express from "express";
import doctorRoutes from "./doctorRoutes/index.js";
import departmentRoutes from "./departmentRoutes/index.js";
import imageRoutes from "./imageRoutes/index.js";
import userRoutes from "./userRoutes/index.js";
import slotRoutes from "./slotRoutes/index.js";
import prescriptionRoutes from "./prescriptionRoutes/index.js";
import appointmentRoutes from "./appointmentRoutes/index.js";
import pharmacyRoutes from "./prescriptionRoutes/index.js";

const router = express.Router();

router.use("/doctor", doctorRoutes);
router.use("/department", departmentRoutes);
router.use("/upload", imageRoutes);
router.use("/user", userRoutes);
router.use("/slot", slotRoutes);
router.use("/prescription", prescriptionRoutes);
router.use("/pharmacy", pharmacyRoutes);
router.use("/appointment", appointmentRoutes);

export default router;
