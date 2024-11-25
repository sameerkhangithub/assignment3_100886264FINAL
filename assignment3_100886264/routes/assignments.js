const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');

router.get('/', async(req, res) => {
    try {
        const assignments = await Assignment.find();
        res.render('assignments/index', {
            assignments: assignments,
            query: req.query
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

router.post('/', async(req, res) => {
    const { title, subject, dueDate, description } = req.body;
    try {
        const newAssignment = new Assignment({ title, subject, dueDate, description });
        await newAssignment.save();
        res.redirect('/assignments');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating assignment');
    }
});

router.get('/new', (req, res) => {
    res.render('new-assignment');
});

router.get('/:id/edit', async(req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);
        res.render('edit', { assignment });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching assignment');
    }
});

router.put('/:id', async(req, res) => {
    try {
        const { title, description, subject, dueDate, status } = req.body;
        const updatedAssignment = await Assignment.findByIdAndUpdate(req.params.id, {
            title,
            description,
            subject,
            dueDate,
            status
        }, { new: true });

        if (!updatedAssignment) {
            return res.status(404).send('Assignment not found');
        }

        res.redirect('/assignments');
    } catch (err) {
        res.status(500).send('Error updating assignment');
    }
});
router.delete('/:id', async(req, res) => {
    try {
        await Assignment.findByIdAndDelete(req.params.id);
        res.redirect('/assignments?deleted=true');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting assignment');
    }
});


module.exports = router;