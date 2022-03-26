const express = require('express');
const faker = require('faker');

const router = express.Router();


router.get('/', (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),

    })

  }
  res.json(products);
});

router.post('/', (req, res) => {
  const body = req.body;
  res.status(201).json( // status code agregado
    {
      message: 'Created',
      data: body
    }
  );
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  if (id === '999') {
    res.status(404).json( // status code agregado
      {
        message: 'not found'
      }
    );
  }
  else {
    res.status(200).json(
      {
        id,
        name: "Product by id",
        price: 2000
      }
    )
  }

})

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json(
    {
      message: 'Updated',
      id,
      data: body
    }
  );
})

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json(
    {
      message: 'Updated',
      id,
      data: body
    }
  );
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json(
    {
      message: 'Deleted',
      id
    }
  );
})





module.exports = router;
