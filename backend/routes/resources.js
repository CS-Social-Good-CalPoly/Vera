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
        console.log('Error in endpoint!')
        res.status(500).json({ message: err.message })
    }
})

// GET route for all sub resource categories
router.get('/subrsrcs', async (req, res) => {
    try {
        const rsrc = await SubResources.find()
        res.json(rsrc)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// GET route for all individual resources
router.get('/individualResources', async (req, res) => {
    try {
        const { listOfResourceIDs } = req.query
        const resourceIDs = JSON.parse(listOfResourceIDs)
        const resources = await IndResources.find({ _id: { $in: resourceIDs } })
        res.json(resources)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router
