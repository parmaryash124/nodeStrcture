import User from "../models/user";
import JwtService from "../services/JwtService";
import { Response } from "../services/Common";
import { registerValidation } from "../validator/registerValidation";

const userController = {
  async getUser(req, res, next) {
    console.log("hello user..");
    res.json("done");
  },

  async Register(req, res, next) {
    // validate the body`

    console.log(req.file, "file");
    const { error } = registerValidation.validate(req.body);
    if (error) return next(error);
    try {
      let accessToken = await JwtService.sign({
        // _id: user._id,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
      });
      let user = await User.create({ ...req.body, accessToken });
      if (user) {
        // user = await User.findByIdAndUpdate(
        //   { _id: user._id },
        //   { accessToken: access_token },
        //   { new: true }
        // );

        await Response(res, "User created successfully", user, 1);
      } else {
        res.json("something went wrong");
      }
    } catch (e) {
      console.log(e, "eror");
      return next(e.message);
    }
  },

  async editProfile(req, res, next) {
    console.log("hey edit profile");
  },
};

export default userController;
