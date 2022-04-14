const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const ProductsService = require('./../services/product.services');
const router = express.Router();
const service = new ProductsService();
const { createProductSchema, updateProductSchema, getProductSchema } = require("../schemas/product.schema.js");



router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});


router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const product = await service.create(body);
    const result = product ? () => res.status(201).json({ message: 'Created' }) : () => res.status(404).json('Valor is null');
    result(); //ver false
  })


router.get('/:id',
  validatorHandler(getProductSchema, 'params'), // se usa el handler y se le pasa el schema validador
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.status(201).json(product);
    } catch (error) {
      next(error);

    }

  })

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.updatePatch(id, body);
      res.status(201).json({ message: 'Updated', data: product });
    } catch (error) {
      next(error);
    }

  })

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.status(201).json({ message: 'Updated', data: product })
  } catch (error) {
    next(error);
  }
})

router.delete('/:id', async (req, res, next) => { //HECHO
  try {
    const { id } = req.params;
    const product = await service.delete(id);
    if (product) {
      res.status(201).json('Deleted')
    }
  } catch (error) {
    next(error);;
  }

})





module.exports = router;
