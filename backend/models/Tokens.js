const { model, Schema } = require('mongoose')

const TokenSchema = new Schema({
    Value: { type: String, require },
    AssociatedStories: { type: [String], require, default: [] },
})

module.exports = model('tokens', TokenSchema, 'tokens')
