import User from "../models/user";
import CustomErrorHandler from "../services/CustomErrorHandler";
import JwtService from "../services/JwtService";

const auth = async (req, res, next) => {
  let authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(CustomErrorHandler.unAuthorized());
  }
  const token = authHeader.split(" ")[1];
  try {
    const { email, phoneNumber } = await JwtService.verify(token);
    const user = await User.findOne({
      accessToken: { $elemMatch: { $eq: token } },
    });
    if (!user || user.accessToken == "")
      return next(CustomErrorHandler.unAuthorized());
    req.user = user;
    next();
  } catch (err) {
    return next(CustomErrorHandler.unAuthorized());
  }
};

export default auth;
