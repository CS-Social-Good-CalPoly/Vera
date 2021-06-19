const express = require('express')

const router = express.Router()

const genResources = require('../models/GenResources')

router.get('/generalrsrcs', (req, res) => {
    res.send('General Resources here')
})

router.get('/subrsrcs', (req, res) => {
    res.send('Sub Resources here')
})

module.exports = router
