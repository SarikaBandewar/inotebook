const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  //let obj = { name: 'Sarika' };
  res.json([]);
});

module.exports = router;
