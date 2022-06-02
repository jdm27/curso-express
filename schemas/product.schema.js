const joi = require("joi"); //importamos joi


//creamos la estructura de los campos
const id = joi.string().uuid();
const name = joi.string().min(3).max(25);
const price = joi.number().positive().integer().min(10);
const image = joi.string().uri();


//creamos las funciones que van a validar
const createProductSchema = joi.object({
  name: name.required(),
  price: price.required(),
  image: image,
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
