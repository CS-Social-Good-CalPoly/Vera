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
    Status: { type: String, default: 'review' },
    RejectionReasonList: { type: [String], default: [] },
})

StorySchema.statics.tokenExists = async function (token) {
    try {
        const existingToken = await this.findOne({ Token: token })
        return !!existingToken
    } catch (error) {
        console.error('Error checking token:', error)
        throw error
    }
}

module.exports = model('story', StorySchema, 'story')
