const { model, models, Schema } = require('mongoose')

const CollegeMajorsSchema = new Schema(
    {
        College: { type: String, required: true },
        Majors: {
            type: [String],
            required: true,
            validate: {
                validator: function (value) {
                    return Array.isArray(value) && value.length > 0
                },
                message: 'Majors must be an array of strings.',
            },
        },
    },
    {
        timestamps: true, // Tracks createAt and updateAt times
        strict: true, // must match schema exactly
    },
)

const CollegeMajors =
    models['colleges'] || model('colleges', CollegeMajorsSchema)

module.exports = CollegeMajors
