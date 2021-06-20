const express = require('express')

const router = express.Router()

const GenResources = require('../models/GenResources')

router.get('/generalrsrcs', async (req, res) => {
    // res.send('General Resources here')
    try {
        const rsrc = await GenResources.find()
        res.json(rsrc)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.get('/subrsrcs', async (req, res) => {
    res.send('Sub Resources here')
})

module.exports = router
