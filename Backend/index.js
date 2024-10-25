const connectToMongo = require('./db');
connectToMongo();
const express = require('express')
const app = express()
const port = 5000
var cors = require('cors')

app.use(cors())
//available routes
app.use(express.json());

app.use('/api/auth',require('./routes/auth'))
    
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});