import Joi from "joi";
import cpf from 'cpf'

export const Register = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  cpf: Joi.string().custom(cpfValidator),
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

function cpfValidator (value, helper) {
  const formated = cpf.format(value)
  if (cpf.isValid(formated)) return value;
  else throw new Error('Invalid CPF');
} 