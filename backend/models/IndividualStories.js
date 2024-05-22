const { model, Schema } = require('mongoose')

const StorySchema = new Schema({
    Title: String,
    ImageUrl: String,
    ImageAltText: String,
    RelevantCategoryList: [
        {
            type: Schema.Types.ObjectId,
            ref: 'general-story-category',
        },
    ],
    ParagraphText: String,
    Date: Date,
    StudentMajor: String,
    StudentCollege: String,
    StudentYear: String,
    GeneralCategory: String,
    Token: String,
    Approved: { type: Boolean, default: false },
    Status: { type: String, default: 'review' },
    RejectionReasonList: { type: [String], default: [] },
})

module.exports = model('story', StorySchema, 'story')
