import mongoose from "mongoose";
const Schema = mongoose.Schema;
const postSchema = new Schema(
  {
    productName: { type: String, required: true },
    price: { type: String, required: true },
    qty: { type: String, required: true },
    userId: { type: String, require: true },
  },
  { timestamps: true }
);


export default mongoose.model("Post", postSchema, "tbl_posts");
