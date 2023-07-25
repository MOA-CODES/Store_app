const express = require('express')
const router = express.Router()
const {getALLproducts, getALLproductsStatic} = require('../controllers/products_C')

router.route('/').get(getALLproducts)
router.route('/static').get(getALLproductsStatic)

module.exports = router