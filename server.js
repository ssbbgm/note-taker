//Get modules
const express = require('express');
const path = require('path');
const fs = require('fs');


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


//Set up port to listen to requests
app.listen(PORT, () =>
  console.log(`Note app listening at http://localhost:${PORT}`)
);
