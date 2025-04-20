const express = require('express')

const router = express.Router()

const GenResources = require('../models/GenResources')
const SubResources = require('../models/SubResources')
const IndResources = require('../models/IndividualResources')
const ObjectId = require('mongodb').ObjectId;

// GET route for all general resource categories
router.get('/generalrsrcscat', async (req, res) => {
    try {
        const rsrc = await GenResources.find()
        res.json(rsrc)
    } catch (err) {
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
        let resources

        if (listOfResourceIDs && listOfResourceIDs !== undefined) {
            // route includes specific resource to GET
            const resourceIDs = JSON.parse(listOfResourceIDs)
            resources = await IndResources.find({ _id: { $in: resourceIDs } })
        } else {
            // no specification, GET ALL resources
            resources = await IndResources.find()
        }
        res.json(resources)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// GET route for all stories associated with a specific token
router.get('/Resources', async (req, res) => {
    try {
        // find resourceId from request
        const resourceId = req.query.resourceId;

        // check if the ID is provided and not empty
        if (!resourceId) {
            return res.status(400).json({ error: 'Missing or empty ID parameter' });
        }

        // validate the ID format
        if (!ObjectId.isValid(resourceId)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        // convert to ObjectId
        const resourceObjectId = ObjectId.createFromHexString(resourceId)

        // get stories with IDs that belong to that token
        const resource = await IndResources.findOne(
            { _id: resourceObjectId }
        )
        if (!resource) {
            return res.status(500).json({ message: `No resource with id ${resourceId} was found` })
        }
        res.status(200).json(resource)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router
