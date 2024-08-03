const express = require('express');
const { checkIn, checkOut } = require('../controller/vehicle');

const router = express.Router();

router.post('/check-in', checkIn);
router.post('/check-out', checkOut);

module.exports = router;
