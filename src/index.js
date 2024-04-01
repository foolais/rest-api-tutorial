const express = require('express');
const routes = require('./routes');
const logger = require('./utils/logger');

const app = express();
const port = 4000;

routes(app);

app.listen(port, () => logger.info(`Server is listening on port ${port}`));
