const { model, Schema } = require('mongoose')

const GenResSchema = new Schema({
    Name: String,
    Title: String,
    SubCategoryIDList: [
        {
            type: Schema.Types.ObjectId,
            ref: 'resource-sub-category',
        },
    ],
})

module.exports = model(
    'general-resource-category',
    GenResSchema,
    'general-resource-category',
)
