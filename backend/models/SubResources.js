const {model, Schema} = require('mongoose')

const SubResourceSchema = new Schema({
    Name: String,
    Title: String
})

module.exports = model('resource-sub-category', SubResourceSchema)
