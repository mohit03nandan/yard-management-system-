const express = require('express');
const { dockingarea } = require('../controller/Docking');

const router = express.Router();

router.post('/dockingarea', dockingarea);


module.exports = router;
