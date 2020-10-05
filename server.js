const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');  
const mongoose = require('mongoose');
const uriUtil = require('mongodb-uri');

const mongodbUri = 'mongodb+srv://yash:yarhraghua123@employees.v54ww.mongodb.net/<dbname>?retryWrites=true&w=majority';
const mongooseUri = uriUtil.formatMongoose(mongodbUri);
const dbOptions = {};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(cors());

app.use('/api/contacts', require('./api/contacts/routes/post_contact'));
app.use('/api/contacts', require('./api/contacts/routes/get_contacts'));
app.use('/api/contacts', require('./api/contacts/routes/get_contact'));
app.use('/api/contacts', require('./api/contacts/routes/delete_contact'));
app.use('/api/contacts', require('./api/contacts/routes/put_contact'));

const hostname = 'localhost';
const port = 5000;

app.listen(port, hostname, () => {

  mongoose.connect(mongooseUri, dbOptions, (err) => {
    if(err){
      console.log(err);
    }
    console.log(`Server is running at http://${hostname}:${port}`);
  });

});
