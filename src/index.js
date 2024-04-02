const express = require('express');
const routes = require('./routes');
const logger = require('./utils/logger');
const bodyParser = require('body-parser');
const cors = require('cors');

// connect to MongoDB
require('./utils/connectDB');

const app = express();
const port = 4000;

// parse body request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors access handler
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT'],
    allowedHeaders: ['Content-Type']
  })
);

routes(app);

app.listen(port, () => logger.info(`Server is listening on port ${port}`));
