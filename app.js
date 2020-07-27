const express = require('express')

const productRoutes = require('./routes/product')

const app = express()

app.use(require('morgan')('dev'))
app.use(require('cors')())

app.use('/invest_trustagrrqst_ib/v1/ib/tma', productRoutes)

module.exports = app
