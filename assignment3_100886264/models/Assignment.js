const mongoose = require('mongoose');

// Define the schema for an assignment
const assignmentSchema = new mongoose.Schema({
    title: {
        type: String, // The title of the assignment
        required: true // The title is required for every assignment
    },
    subject: {
        type: String, // The subject of the assignment
        required: true // The subject is required for every assignment
    },
    dueDate: {
        type: Date, // The due date of the assignment
        required: true // The due date is required for every assignment
    },
    description: {
        type: String, // A description of the assignment (optional)
    },
    status: {
        type: String, // The status of the assignment (e.g., 'Pending', 'Completed')
        default: 'Pending' // The default status is 'Pending' if not specified
    }
});

// Create a model based on the assignment schema
const Assignment = mongoose.model('Assignment', assignmentSchema);

// Export the model to be used in other parts of the app
module.exports = Assignment;