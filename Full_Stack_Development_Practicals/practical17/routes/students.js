const express = require('express');
const Student = require('../models/student');
const mongoose = require('mongoose');

const router = express.Router();

// View all students (GET /students)
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.render('students/index', { students });
    } catch (err) {
        console.error('Error fetching students:', err);
        res.status(500).send('Error fetching students');
    }
});

// Form to add new student (GET /students/add)
router.get('/add', (req, res) => {
    res.render('students/add');
});

// Add new student (POST /students)
router.post('/', async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save();
        res.redirect('/students');
    } catch (err) {
        console.error('Error adding student:', err);
        res.status(500).send('Error adding student: ' + err.message);
    }
});

// Form to edit student (GET /students/edit/:id)
router.get('/edit/:id', async (req, res) => {
    try {
        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send('Invalid student ID');
        }
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).send('Student not found');
        }
        res.render('students/edit', { student });
    } catch (err) {
        console.error('Error fetching student:', err);
        res.status(500).send('Error fetching student: ' + err.message);
    }
});

// Edit student (POST /students/edit/:id)
router.post('/edit/:id', async (req, res) => {
    try {
        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send('Invalid student ID');
        }
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!updatedStudent) {
            return res.status(404).send('Student not found');
        }
        res.redirect('/students');
    } catch (err) {
        console.error('Error updating student:', err);
        res.status(500).send('Error updating student: ' + err.message);
    }
});

// Delete student (GET /students/delete/:id) - Using GET for simplicity
router.get('/delete/:id', async (req, res) => {
    try {
        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send('Invalid student ID');
        }
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).send('Student not found');
        }
        res.redirect('/students');
    } catch (err) {
        console.error('Error deleting student:', err);
        res.status(500).send('Error deleting student: ' + err.message);
    }
});

module.exports = router;