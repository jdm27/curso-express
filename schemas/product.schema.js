const joi = require("joi"); //importamos joi


//creamos la estructura de los campos
const id = joi.string().uuid();
const name = joi.string().alphanum().min(3).max(20);
const price = joi.number().positive().integer().min(10);


//creamos las funciones que van a validar
const createProductSchema = joi.object({
  id: id.required(),
  name: name.required(),
  price: price.required()
});

const updateProductSchema = joi.object({
  id: id,
  name: name,
  price: price,
});

const getProductSchema = joi.object({
  id: id.required(),
});


// exportamos las funciones
module.exports = { createProductSchema, updateProductSchema, getProductSchema }
