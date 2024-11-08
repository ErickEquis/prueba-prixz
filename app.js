const express = require("express")
const cors = require('cors')

const app = express()
const bodyParser = require('body-parser');
const morgan = require('morgan');

const port = 8880

app.listen(port, () => {
    console.log(`Servidor en puerto ${port}`)
})

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

require(`./server/routes/users`)(app);
require(`./server/routes/products`)(app);