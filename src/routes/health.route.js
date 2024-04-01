const { Router } = require('express');
const { getAllHealth } = require('../controllers/health.controller');

const HealthRouter = Router();

HealthRouter.get('/', getAllHealth);

module.exports = { HealthRouter };
