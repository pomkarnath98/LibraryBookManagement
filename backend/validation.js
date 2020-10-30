const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    age: Joi.number().required(),
    contactnumber: Joi.number().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const addBookValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    publishedYear: Joi.number().max(2020).required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    totalChapters: Joi.number().required(),
    chapters: Joi.array().required(),
  });

  return schema.validate(data);
};

module.exports = { registerValidation, loginValidation, addBookValidation };
