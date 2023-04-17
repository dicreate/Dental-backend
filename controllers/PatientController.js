const { Patient } = require('../models')

function PatientController() { }
  
const create = function(req, res) {
   const data = {
      fullname: req.body.fullname, 
      phone: req.body.phone, 
   };

   Patient.create(data).then(function(err, doc) {
      if (err) {
         return res.status(500).json({
            status: false,
            message: err
         });
      }

      res.status(201).json({
         status: true,
         data: doc
      });
   });
}

const all = function (req, res) {
   Patient.find({}).then(function (err, docs) {
      if (err) {
         return res.status(500).json({
            status: false,
            message: err
         });
      }

      res.status(201).json({
         status: true,
         data: docs
      });
   });
}

PatientController.prototype = {
   all, create
}

module.exports = PatientController;