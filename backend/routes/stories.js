const express = require('express')

const router = express.Router()

const GenStories = require('../models/GenStories')
const IndStories = require('../models/IndividualStories')

// GET route for all general story categories
router.get('/generalstorycat', async (req, res) => {
    try {
        const stry = await GenStories.find({})
        res.json(stry)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.get('/individualstory', async (req, res) => {
    try {
        const individual = await IndStories.find({})
        res.json(individual)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// GET route for individual stories
router.get('/:category', async (req, res) => {
    try {
        const stories = await IndStories.find({GeneralCategory: req.params.category})   
        res.json(stories)
    } catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
})

module.exports = router