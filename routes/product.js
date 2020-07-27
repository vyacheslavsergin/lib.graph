const express = require('express')
const router = express.Router()
const controller = require('../controllers/product')

router.get('/product', controller.getAll)

module.exports = router
