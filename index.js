const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://eneapaja27:<password>@benji127test.n7ytzwh.mongodb.net/?retryWrites=true&w=majority&appName=benji127Test/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Define schema
const studentSchema = new mongoose.Schema({
  name: String,
  studentID: String
});

// Create model
const Student = mongoose.model('Student', studentSchema, 'w24students');

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html");
});

app.post('/', async (req, res) => {
  // Get data from the form
  const { name, studentID } = req.body;

  // Create a new student document
  const student = new Student({
    name,
    studentID
  });

  // Save the document to the database
  await student.save();

  // Send a response to the user
  res.send(`<h1>Document Added</h1>`);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
