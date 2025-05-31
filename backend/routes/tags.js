const express = require('express')
const router = express.Router()
const IndResources = require('../models/IndividualResources')
const ResourceTag = require('../models/ResourceTag')

/**
 * POST route to add a tag to a resource
 * Requires: resourceId and tag in the request body
 */
router.post('/add', async (req, res) => {
    try {
        const { resourceId, tag } = req.body

        // Find the resource by ID
        const resource = await IndResources.findById(resourceId)

        // Check if the resource exists
        const tagExists = resource.Tags.some(
            (t) => t.toLowerCase() === tag.toLowerCase(),
        )

        // Raise error if the tag already exists to avoid duplicates
        if (tagExists) {
            return res
                .status(409)
                .json({ message: 'Tag already exists for this resource' })
        }

        // Add the tag to the resource
        if (!resource.Tags) {
            resource.Tags = [tag]
        } else {
            resource.Tags.push(tag)
        }

        // Save the updated resource
        await resource.save()

        // Return the updated resource
        return res.status(201).json({
            message: 'Tag added successfully',
            resource: resource,
        })
    } catch (err) {
        console.error('Error adding tag:', err)
        return res.status(500).json({ message: err.message })
    }
})

/**
 * DELETE route to remove a tag from a resource
 * Requires: resourceId and tag in the request parameters
 */
router.delete('/remove/:resourceId/:tag', async (req, res) => {
    try {
        const { resourceId, tag } = req.params

        // Find the resource by ID
        const resource = await IndResources.findById(resourceId)

        // Remove the tag from the resource
        resource.Tags = resource.Tags.filter((t) => t !== tag)

        // Save the updated resource
        await resource.save()

        // Return the updated resource
        return res.status(200).json({
            message: 'Tag removed successfully',
            resource: resource,
        })
    } catch (err) {
        console.error('Error removing tag:', err)
        return res.status(500).json({ message: err.message })
    }
})

/**
 * POST route to add a single tag to the resource-tag collection
 * Requires: tagName in the request body
 */
router.post('/create', async (req, res) => {
    try {
        const { tagName } = req.body
        const trimmedTagName = tagName.trim()

        // Create new tag
        const newTag = new ResourceTag({ name: trimmedTagName })
        await newTag.save()

        res.status(201).json({
            message: 'Tag created successfully',
            tag: newTag
        })
    } catch (error) {
        console.error('Error creating tag:', error)
        res.status(500).json({ message: 'Error creating tag' })
    }
})

module.exports = router

router.get('/all', async (req, res) => {
    try {
        const tags = await ResourceTag.find()
        return res.status(200).json(tags.map(tag => tag.name))
    } catch (error) {
        console.error('Error fetching tags:', error)
        return res.status(500).json({ message: 'Error fetching tags' })
    }
})
