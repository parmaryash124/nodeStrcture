import Post from "../models/post";
import { Response } from "../services/Common";

const productController = {
  async addProduct(req, res, next) {
    try {
      let post = await Post.create({ ...req.body, userId: req.user._id });
      Response(res, "post created", post, 1);
    } catch (e) {
      console.log(e, "e");
      return next(e);
    }
  },
  async listProduct(req, res, next) {
    let products = await Post.find({ userId: req.user._id });
    try {
      Response(res, "Fetch Products.", products, 1);
    } catch (e) {
      return next(e);
    }
  },
};

export default productController;
