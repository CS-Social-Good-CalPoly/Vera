const express = require('express')

const router = express.Router()

const genResources = require('../models/GenResources')

router.get('/generalrsrcs', async (req, res) => {
    try {
        const genResources = await genResources.find()
        res.json(genResources)
    } catch (err) {
        res.json({message: err})
    }
})

router.get('/subrsrcs', (req, res) => {
    res.send('Sub Resources here')
})

module.exports = router
