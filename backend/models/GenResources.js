const {model, Schema} = require('mongoose')

const GenResSchema = new Schema({
    Name: String,
    Title: String,
    SubCategoryIDList: [
        {
            type: Schema.Types.ObjectId,
            ref: 'SubResources'
        }
    ]
})

module.exports = model('GenResources', GenResSchema)
