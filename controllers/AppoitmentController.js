const { Appoitment } = require("../models");
const { validationResult} = require('express-validator');

function AppoitmentController() {}

const create = function(req, res) {
   
   const errors = validationResult(req);

   const data = {
      patient: req.body.patient,
      dentNumber: req.body.dentNumber,
      diagnosis: req.body.diagnosis,
      price: req.body.price,
      date: req.body.date,
      time: req.body.time,
   };

   console.log(data);

   if(!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
   }

   Appoitment.create(data).then((doc) => {
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
   Appoitment.find({})
   .populate('patient')
   .then((docs) =>
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

AppoitmentController.prototype = {
   all, create
}

module.exports = AppoitmentController;