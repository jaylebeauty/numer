const express = require('express')
const RoeCtrl = require('../controller/ctrl')
const router = express.Router()
router.get('/BisectionEx',RoeCtrl.getBisectionEX)
module.exports = router