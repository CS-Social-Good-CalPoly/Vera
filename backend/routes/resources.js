const express = require('express')

const router = express.Router()

const GenResources = require('../models/GenResources')
const SubResources = require('../models/SubResources')
const IndResources = require('../models/IndividualResources')
const Stories = require('../models/Stories')

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

// GET route for stories
router.get('/stories', async (req, res) => {
    try {
        const stories = await Stories.find({})   
        res.json(stories)
    } catch (err) {
        res.status(404).json({
            message: err.message
        })
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
