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

// POST route for story submissions
router.post("/StorySubmission", async (req, res) => {
  const {
    Title,
    ImageUrl,
    ImageAltText,
    RelevantCategoryList,
    ParagraphText,
    Date,
    StudentMajor,
    StudentCollege,
    StudentYear,
    GeneralCategory,
  } = req.body;

  const newStory = new IndStories({
    Title,
    ImageUrl,
    ImageAltText,
    RelevantCategoryList,
    ParagraphText,
    Date,
    StudentMajor,
    StudentCollege,
    StudentYear,
    GeneralCategory,
  });

  try {
    const savedStory = await newStory.save();
    res.status(201).json(savedStory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = router