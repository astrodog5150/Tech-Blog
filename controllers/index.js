const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

// Define API routes
router.use('/api', apiRoutes);

// Define homepage routes
router.use('/', homeRoutes);

module.exports = router;