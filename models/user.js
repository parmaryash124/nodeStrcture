import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, require: true },
    address: { type: String, required: false },
    photo: { type: String, required: false },
    dob: { type: String, required: false },
    accessToken: { type: [String], default: "" },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema, "users");
