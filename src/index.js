const express = require('express');
const routes = require('./routes');

const app = express();
const port = 4000;

console.log({ routes });
routes(app);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
