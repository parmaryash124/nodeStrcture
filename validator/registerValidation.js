import Joi from "joi";
import { FIRST_NAME_REQ } from "../constant";

export const registerValidation = Joi.object({
  firstName: Joi.string().required().messages({
    "string.empty": FIRST_NAME_REQ,
    "any.required": FIRST_NAME_REQ,
  }),
  email: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  password: Joi.string(),
});

export const registerValidation1 = (req, res, next) => {
  req.checkBody("firstName", "firstname is required").notEmpty();
  req.checkBody("email", "email is required").notEmpty().isEmail();
  req.checkBody("phoneNumber", "phoneNumber is required").notEmpty();
  req.checkBody("password", "password is required").notEmpty();

  const error = req.validationErrors();
  if (error && error.length) {
    res.json(error);
  } else {
    next();
  }
};
