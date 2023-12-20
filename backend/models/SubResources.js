const { model, Schema } = require('mongoose')

// incomplete
const SubResourceSchema = new Schema({
    Name: String,
    Title: String,
    ShortDescription: String,
    LongDescription: String,
    ImageUrl: String,
    ImageAltText: String,
    ResourceIDList: [
        {
            type: Schema.Types.ObjectId,
            ref: 'individual-resources',
        },
    ],
})

module.exports = model(
    'resource-sub-category',
    SubResourceSchema,
    'resource-sub-category',
)
