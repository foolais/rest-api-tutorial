const express = require('express')

const app = express()
const port = 4000

app.use('/', (req, res) => {
  res.status(200).send({ status: res.statusCode, data: 'hello world' })
})

app.listen(port, () => console.log(`Server is listening on port ${port}`))
