const Joi = require("joi");
const validator = require("../validator");


const addPaymentSchema = validator(
  Joi.object({
    user_body: Joi.object().required(),
    request_body: Joi.object().required(),
    proof: Joi.string().required(),
  })
);
const approvePaymentSchema = validator(
  Joi.object({
    pay_id: Joi.string().required(),
    status:Joi.string().allow('', null),
    password: Joi.string()
  })
);

module.exports = {addPaymentSchema, approvePaymentSchema};
  