const express = require('express');
const updateRoutes = require('./update');

const router = express.Router();
router.use('/v1', updateRoutes);

module.exports = router;