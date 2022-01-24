const {model, Schema} = require('mongoose')

const StorySchema = new Schema({
    Title: String,
    ImageUrl: String,
    ImageAltText: String,
    RelevantCategoryList: [String],
    ParagraphText: String,
    Date: Date,
    StudentMajor: String,
    StudentCollege: String,
    StudentYear: String,
    GeneralCategory: String
})

module.exports = model('story', StorySchema, 'story')