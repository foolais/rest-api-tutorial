const { HealthRouter } = require('./health');
const { ProductRouter } = require('./product');

const _routes = [
  ['/health', HealthRouter],
  ['/products', ProductRouter]
];

const routes = (app) => {
  _routes.forEach((route) => {
    const [path, router] = route;
    app.use(path, router);
  });
};

module.exports = routes;
