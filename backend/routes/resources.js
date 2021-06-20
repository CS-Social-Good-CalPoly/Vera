const express = require('express')

const router = express.Router()

const GenResources = require('../models/GenResources')
const SubResources = require('../models/SubResources')
const IndResources = require('../models/IndividualResources')

// GET route for all general resource categories
router.get('/generalrsrcscat', async (req, res) => {
    try {
        const rsrc = await GenResources.find()
        res.json(rsrc)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// GET route for all sub resource categories
router.get('/subrsrcs', async (req, res) => {
    try {
        const rsrc = await SubResources.find()
        res.json(rsrc)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// GET route for all individual resources
router.get('/:category', async (req, res) => {
    try {
        const categorizedResources = await IndResources.find({Category: req.params.category})
        res.json(categorizedResources)
    } catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
})

module.exports = router
