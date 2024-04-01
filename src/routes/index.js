const { HealthRouter } = require('./health');

const _routes = [['/health', HealthRouter]];

const routes = (app) => {
  _routes.forEach((route) => {
    const [path, router] = route;
    app.use(path, router);
  });
};

module.exports = routes;
