const { HealthRouter } = require('./health');
const { ProductsRouter } = require('./products');

const _routes = [
  ['/health', HealthRouter],
  ['/products', ProductsRouter]
];

const routes = (app) => {
  _routes.forEach((route) => {
    const [path, router] = route;
    app.use(path, router);
  });
};

module.exports = routes;
