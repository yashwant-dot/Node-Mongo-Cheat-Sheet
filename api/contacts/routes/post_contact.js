const express = require('express');
const moongose = require('mongoose');
const Contact = require('../model/Contact');
const router = express.Router();

router.route('/')
  .post((req, res) => {

    const contact = new Contact(req.body);
    contact.save((err, contact) => {
      if(err){
        res.status(400).json(err);
      }
      res.json(contact);
    });
  })

  module.exports = router;
