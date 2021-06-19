const {model, Schema} = require('mongoose')

// incomplete
const SubResourceSchema = new Schema({
    Name: String,
    Title: String
})

module.exports = model('resource-sub-category', SubResourceSchema)
