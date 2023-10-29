const express = require('express');
const dataControllers = require('../controllers/dataControllers');

const router = express.Router();

router.get('/data', dataControllers.fetchData);

module.exports = router;