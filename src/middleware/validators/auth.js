const Joi = require("joi");
const validator = require("../validator");


const registerSchema = validator(
  Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    medium: Joi.string()
      .valid("normal", "google")
      .required(),
    password: Joi.when("medium", {
      is: "normal",
      then: Joi.string().required(),
      otherwise: Joi.string().allow('', null),
    }),
    phone: Joi.string(),
    imageUrl:Joi.string(),
    googleId:Joi.string(),
  })
);
const authGoogleSchema = validator(
  Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().required(),
    medium: Joi.string()
      .valid("normal", "google")
      .required(),
    imageUrl:Joi.string(),
    googleId:Joi.string(),
  })
);
const loginSchema = validator(
    Joi.object({
    email: Joi.string().email().required(),

    medium: Joi.string()
      .valid("normal", "google")
      .required(),

    password: Joi.when("medium", {
      is: "normal",
      then: Joi.string().required(),
      otherwise: Joi.string().allow('', null),
    }),
}))

module.exports = {registerSchema, loginSchema, authGoogleSchema};
  