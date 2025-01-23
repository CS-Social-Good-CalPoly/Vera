const { model, Schema } = require('mongoose')

const IndResSchema = new Schema({
    _id: Schema.Types.ObjectId,
    ImageURL: String,
    ImageAltText: String,
    Title: String,
    Address: String,
    BuildingName: String,
    ParagraphText: String,
    PhoneNumber: String,
    ResourceURL: String,
    LastUpdate: Date,
    Category: String,
    ExtraInfo: [String],
    ListOfHours: [String],
})

module.exports = model(
    'individual-resources',
    IndResSchema,
    'individual-resources',
)
