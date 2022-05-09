//Get modules
const express = require('express');
const path = require('path');
const fs = require('fs');
const ShortUniqueId = require('short-unique-id');



//Use express middleware
const app = express(); 
const PORT = process.env.port || 3001;

//Make unique ID
let uuid = new ShortUniqueId({ length: 4});

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
app.post("/api/notes", function(req, res) {
  fs.readFile("./db/db.json", "utf8", function(error, response) {
      if (error) {
          console.log(error);
      } 

        const { title, text } = req.body;
        const newNote = {
          title,
          text,
          note_id: uuid()
        }
        let data = JSON.parse(response);
        let newData = []
        newData.push(newNote)

     fs.writeFile("./db/db.json", JSON.stringify(newData), function(err) {
          if (err) throw err;
      });
  });
}) 



//Set up port to listen to requests
app.listen(PORT, () =>
  console.log(`Note app listening at http://localhost:${PORT}`)
);
