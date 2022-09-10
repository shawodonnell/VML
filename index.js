const express = require('express')
const app = express()
const port = process.env.port || 2000
const router = require('./router/router');
require('dotenv').config();

app.use(express.json());
app.use('/api', router);


app.listen(port, () => console.log(`Listening on Port ${port}`));