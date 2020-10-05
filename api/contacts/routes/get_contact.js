const moongose = require('mongoose');
const Contact = require('../model/Contact');
const express = require('express');
const router = express.Router();

router.route('/:id')
  .get((req, res) => {
    
    const _id = req.params.id;

    Contact.findOne({_id}, (err, contact) => {
      if(err) {
        res.status(400).json(err);
      }

      if(!contact) {
        res.status(404).json({message: 'No Contact Found'});
      }

      res.json(contact);
    });
  });

  module.exports = router;
