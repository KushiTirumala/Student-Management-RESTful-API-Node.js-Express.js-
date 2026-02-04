const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Sample data
let students = [
  { id: 1, name: 'John Doe', rollNumber: 'A001', course: 'BSc CS' },
  { id: 2, name: 'Jane Smith', rollNumber: 'A002', course: 'BSc IT' }
];

// Routes

// Get all students
app.get('/students', (req, res) => {
  res.json(students);
});

// Get student by ID
app.get('/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: 'Student not found' });
  res.json(student);
});

// Add new student
app.post('/students', (req, res) => {
  const { name, rollNumber, course } = req.body;
  const newStudent = {
    id: students.length + 1,
    name,
    rollNumber,
    course
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// Update student
app.put('/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: 'Student not found' });

  const { name, rollNumber, course } = req.body;
  student.name = name || student.name;
  student.rollNumber = rollNumber || student.rollNumber;
  student.course = course || student.course;

  res.json(student);
});

// Delete student
app.delete('/students/:id', (req, res) => {
  const index = students.findIndex(s => s.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Student not found' });

  const removed = students.splice(index, 1);
  res.json({ message: 'Student deleted', student: removed[0] });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
