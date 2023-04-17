const { Patient } = require('../models')
const { query, validationResult} = require('express-validator');

function PatientController() { }

const create = function(req, res) {
   const data = {
      fullname: req.body.fullname, 
      phone: req.body.phone, 
   };
   
   Patient.create(data).then((doc) => {
      res.status(201).json({
         status: true,
         data: doc
      });
   }).catch((err) => {
      return res.status(500).json({
         status: false,
         message: err
      });
   })
}

const all = function (req, res) {
   Patient.find({}).then((docs) =>
      res.status(201).json({
         status: true,
         data: docs
      })).catch((err) => {
      return res.status(500).json({
         status: false,
         message: err
      });
   });
}

PatientController.prototype = {
   all, create
}

module.exports = PatientController;