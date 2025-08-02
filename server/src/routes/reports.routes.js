const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reports.controller');
const { authenticate } = require('../middlewares/auth');

router.use(authenticate);

router.get('/categories', reportsController.getCategoryReport);
router.get('/export/csv', reportsController.exportIdeasCSV);

module.exports = router;