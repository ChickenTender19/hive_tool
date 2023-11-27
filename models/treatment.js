const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema
const treatmentSchema = new Schema({
    treatment: {
        type: String,
        required: true
    },

    treatmentDate: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming your user model is named 'User'
        required: true
    }
});



module.exports = mongoose.model('Treatment', treatmentSchema);