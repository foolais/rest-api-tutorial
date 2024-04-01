const { Router } = require('express');

const HealthRouter = Router();

HealthRouter.get('/', (req, res) => {
  res.status(200).send({ status: res.statusCode, data: 'health datas' });
});

module.exports = { HealthRouter };
