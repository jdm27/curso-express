const express = require('express');
const ProductsService = require('./../services/product.services');
const router = express.Router();
const service = new ProductsService();


router.get('/', (req, res) => {
  const products = service.find();
  res.json(products);
});

router.post('/', (req, res) => {
  const body = req.body;
  const product = service.create(body);
  const result = product ? () => res.status(201).json({ message: 'Created' }) : () => res.status(404).json('Valor is null');
  result(); //ver false
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.findOne(id);
  res.json(product);
})

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = service.updatePatch(id, body);
  const result = product ? () => res.status(201).json({ message: 'Updated', data: product }) : () => res.status(404).json('Not found');
  result();
})

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = service.update(id, body);
  const result = product ? () => res.status(201).json({ message: 'Updated', data: product }) : () => res.status(404).json('Not found');
  result();

})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.delete(id);
  const result = product ? () => res.status(201).json('Deleted') : () => res.status(404).json('Not found');
  result();

})





module.exports = router;
