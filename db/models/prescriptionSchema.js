import { Schema, model } from "mongoose";

const prescriptionSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
    },
    appointment: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
    },
    message: String,
    medication: [
      {
        type: Schema.Types.ObjectId,
        ref: "Pharmacy",
      },
    ],
  },
  { timestamps: true }
);

const Prescription = model("Prescription", doctorSchema);

export default Prescription;
