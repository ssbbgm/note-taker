//Get modules
const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('short-unique-id');


//Use express middleware
const app = express(); 
const PORT = process.env.port || 3001;

//How to handle data
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Get home page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

// Get notes page 
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

//Get notes info
app.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'db/db.json'))
);

//Post info to the notes file
app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      review_id: uuid(),
    };

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting note');
  }
});


//Set up port to listen to requests
app.listen(PORT, () =>
  console.log(`Note app listening at http://localhost:${PORT}`)
);
