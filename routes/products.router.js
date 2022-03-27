const express = require('express');
const ProductsService = require('./../services/product.services');
const router = express.Router();
const service = new ProductsService();


router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.post('/', async (req, res) => {
  const body = req.body;
  const product = await service.create(body);
  const result = product ? () => res.status(201).json({ message: 'Created' }) : () => res.status(404).json('Valor is null');
  result(); //ver false
})

router.get('/:id', async (req, res) => { //HECHO
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.status(201).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }

})

router.patch('/:id', async (req, res) => { //HECHO
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.updatePatch(id, body);
    res.status(201).json({ message: 'Updated', data: product });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }

})

router.put('/:id', async (req, res) => { //HECHO
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.status(201).json({ message: 'Updated', data: product })
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
})

router.delete('/:id', async (req, res) => { //HECHO
  try {
    const { id } = req.params;
    const product = await service.delete(id);
    if (product) {
      res.status(201).json('Deleted')
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }



})





module.exports = router;
