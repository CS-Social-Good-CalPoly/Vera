const { model, Schema } = require('mongoose')

const TreatementrecoverySchema = new Schema({
    // _id: Schema.Types.ObjectId,
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

module.exports = model('treatment', TreatmentrecoverySchema, 'treatment')
