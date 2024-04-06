const { model, Schema } = require('mongoose')

const TokenSchema = new Schema({
    Value: { type: String, require },
    AssociatedStories: [
        {
            type: Schema.Types.ObjectId,
            ref: 'tokens',
        },
    ],
})

module.exports = model('tokens', TokenSchema, 'tokens')
