const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to update contacts
app.post('/update_contacts', (req, res) => {
  const updatedContacts = req.body;
  
  fs.writeFile('contacts.json', JSON.stringify(updatedContacts, null, 2), (err) => {
    if (err) {
      return res.status(500).send('Error updating contacts');
    }
    res.send('Contacts updated successfully');
  });
});





// Serve the index.html file for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve the contacts.json file
app.get('/contacts.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'contacts.json'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
