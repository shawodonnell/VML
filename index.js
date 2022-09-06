const express = require('express')
const app = express()
const port = process.env.port || 2000
const latlongRouter = require('./router/latlong');

app.use(express.json());
app.use('/latlong',latlongRouter);




app.listen(port, ()=> console.log(`Listening on Port ${port}`));