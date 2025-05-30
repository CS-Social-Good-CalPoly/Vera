const { model, Schema } = require('mongoose')

const ResourceTagSchema = new Schema({
    name: {
        type: String,
        required: true,
    }
});

module.exports = model('resource-tag', ResourceTagSchema, 'resource-tag');
