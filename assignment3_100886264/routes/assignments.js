const express = require('express');
const router = express.Router(); // Create a new router instance for handling assignments
const Assignment = require('../../models/Assignment'); // Import the Assignment model

// Route to get all assignments
router.get('/', async(req, res) => {
    try {
        // Fetch all assignments from the database
        const assignments = await Assignment.find();

        // Render the 'assignments' view and pass assignments data and query parameters to the view
        res.render('assignments', {
            assignments: assignments, // All assignments
            query: req.query // Query parameters from the URL (if any)
        });
    } catch (error) {
        console.error(error); // Log any errors that occur
        res.status(500).send('Server Error'); // Return a 500 error if something goes wrong
    }
});

// Route to create a new assignment
router.post('/', async(req, res) => {
    const { title, subject, dueDate, description } = req.body; // Extract form data from the request body
    try {
        // Create a new Assignment instance with the provided data
        const newAssignment = new Assignment({ title, subject, dueDate, description });

        // Save the new assignment to the database
        await newAssignment.save();

        // Redirect to the list of assignments after successful creation
        res.redirect('/assignments');
    } catch (err) {
        console.error(err); // Log any errors that occur
        res.status(500).send('Error creating assignment'); // Return a 500 error if something goes wrong
    }
});

// Route to display the form for creating a new assignment
router.get('/new', (req, res) => {
    res.render('new-assignment'); // Render the 'new-assignment' view
});

// Route to edit an existing assignment by ID
router.get('/:id/edit', async(req, res) => {
    try {
        // Find the assignment by its ID
        const assignment = await Assignment.findById(req.params.id);

        // Render the 'edit' view and pass the found assignment data to the view
        res.render('edit', { assignment });
    } catch (err) {
        console.error(err); // Log any errors that occur
        res.status(500).send('Error fetching assignment'); // Return a 500 error if something goes wrong
    }
});

// Route to update an existing assignment by ID
router.put('/:id', async(req, res) => {
    try {
        // Extract updated assignment data from the request body
        const { title, description, subject, dueDate, status } = req.body;

        // Update the assignment with the new data
        const updatedAssignment = await Assignment.findByIdAndUpdate(req.params.id, {
            title,
            description,
            subject,
            dueDate,
            status
        }, { new: true }); // `new: true` returns the updated document

        // If no assignment is found, return a 404 error
        if (!updatedAssignment) {
            return res.status(404).send('Assignment not found');
        }

        // Redirect to the list of assignments after the update
        res.redirect('/assignments');
    } catch (err) {
        res.status(500).send('Error updating assignment'); // Return a 500 error if something goes wrong
    }
});

// Route to delete an assignment by ID
router.delete('/:id', async(req, res) => {
    try {
        // Find the assignment by ID and delete it
        await Assignment.findByIdAndDelete(req.params.id);

        // Redirect to the list of assignments with a query indicating the assignment was deleted
        res.redirect('/assignments?deleted=true'); // Pass the 'deleted' query parameter
    } catch (err) {
        console.error(err); // Log any errors
        res.status(500).send('Error deleting assignment'); // Return a 500 error if something goes wrong
    }
});

// Export the router to be used in the main app
module.exports = router;