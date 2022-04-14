const {model, Schema} = require('mongoose')

const IndStories = require('../models/IndividualStories')

const GenStorySchema = new Schema({
    Name: String,
    Title: String,
    StoryIDList: [
        {
            type: Schema.Types.ObjectId,
            ref: 'story'
        }
    ]
})

module.exports = model('general-story-category', GenStorySchema, 'general-story-category')
