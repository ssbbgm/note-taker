const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express(); 
const PORT = process.env.port || 3001;

app.use(express.static('public'));


app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
