const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

// Define a Mongoose schema for the document
const studentSchema = new mongoose.Schema({
  name: String,
  studentID: String
});

// Create a Mongoose model using the schema
const Student = mongoose.model('Student', studentSchema);

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html");
});

app.post('/', async (req, res) => {
  try {
    // Get the MongoDB URI from the form
    const { myuri } = req.body;

    // Define hardcoded values for name and studentID
    const name = "Tiago Guerra Endsfeldz";
    const studentID = "300351925";

    // Connect to the MongoDB database and log the connection
    await mongoose.connect(myuri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Create a new document with the hardcoded values
    const newStudent = new Student({
      name: name,
      studentID: studentID
    });

    // Add the document to the database
    await newStudent.save();
    console.log('Document added to w24students collection');

    // Send a response to the user
    res.send(`<h1>Document Added</h1>`);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
