const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([
    {
      id: 1,
      userName: 'Admin'
    },
    {
      id: 2,
      userName: 'Juan'

    }
  ])

})


module.exports = router;
