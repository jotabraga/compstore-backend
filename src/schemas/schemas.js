
import Joi from "joi";

export const Register = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(100).required(),
});

export const Login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(100).required(),
});

export const Token = Joi.string().guid({ version: "uuidv4" });

export const Deposit = Joi.object({
  description: Joi.string().min(3).required(),
  value: Joi.number().required(),
});