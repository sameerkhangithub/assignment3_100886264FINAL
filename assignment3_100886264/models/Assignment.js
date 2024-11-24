const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        default: 'Pending'
    }
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;