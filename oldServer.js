const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');  
let contacts = require('./data');
const mongoose = require('mongoose');
const uriUtil = require('mongodb-uri');

const mongodbUri = 'mongodb+srv://yash:yarhraghua123@node-mongo.v54ww.mongodb.net/node-mongo?retryWrites=true&w=majority';
const mongooseUri = uriUtil.formatMongoose(mongodbUri);
const dbOptions = {};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(cors());

const hostname = 'localhost';
const port = 5000;

app.get('/api/contacts', (request, response) => {
  if(!contacts) {
    response.status(404).json({message: 'No contacts found'});
  }
  response.json(contacts);
});

app.get('/api/contacts/:id', (request, response) => {

  const requestId = request.params.id;

  let contact = contacts.filter(contact  => {
    return contact.id == requestId;
  })[0];

  if(!contact) {
    response.status(404).json({message: 'No contact found'});
  }

  response.json(contact);

})

app.post('/api/contacts', (request, response) => {
  const contact = {
    id: contacts.length + 1,
    first_name: request.body.first_name,
    last_name: request.body.last_name,
    email: request.body.email,
    website: request.body.website
  };

  contacts.push(contact);

  response.json(contact);
})

app.put('/api/contacts/:id', (request, response) => {
  const requestId = request.params.id;

  let contact = contacts.filter(contact => {
    return contact.id == requestId;
  })[0];

  const index = contacts.indexOf(contact);

  const keys = Object.keys(request.body);

  keys.forEach(key => {
    contact[key] = request.body[key];
  });

  contacts[index] = contact;

  response.json(contacts[index]);

})

app.delete('/api/contacts/:id', (request, response) => {
  const requestId = request.params.id;

  let contact = contacts.filter(contact => {
    return contact.id == requestId;
  })[0];

  const index = contacts.indexOf(contact);

  contacts.splice(index, 1);

  response.json({ message: `User ${requestId} deleted`});

})

app.listen(port, hostname, () => {

  mongoose.connect(mongooseUri, dbOptions, (err) => {
    if(err){
      console.log(err);
    }
    console.log(`Server is running at http://${hostname}:${port}`);
  });
  
});
