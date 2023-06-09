const { Appoitment, Patient } = require("../models");
const { validationResult} = require('express-validator');
const { groupBy, reduce } = require('lodash')

function AppoitmentController() {}

const create = async function(req, res) {
   
   const errors = validationResult(req);

   const data = {
      patient: req.body.patient,
      dentNumber: req.body.dentNumber,
      diagnosis: req.body.diagnosis,
      price: req.body.price,
      date: req.body.date,
      time: req.body.time,
   };

   try {
      const patient = await Patient.findOne({_id: data.patient});
   } catch {
      return res.status(404).json({
         status: false,
         message: "PATIENT_NOT_FOUND"
      });
   }

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

const remove = async function (req, res) {

   const id = req.params.id;

   try {
      const appoitment = await Appoitment.findOne({_id: id});
      
      if (appoitment == null) {
         return res.status(404).json({
            status: false,
            message: "APPOITMENT_NOT_FOUND"
         });
      }
   } catch(err) {
      return res.status(404).json({
         status: false,
         message: "APPOITMENT_NOT_FOUND"
      });
   }

   Appoitment.deleteOne({_id: id}).then(() => {
      res.json({
         status: "success"
      })
   }).catch(err => {
      return res.status(500).json({
         status: false,
         message: err
      });
   })
}

const update = async function(req, res) {

   const appoitmentId = req.params.id;
   const errors = validationResult(req);

   const data = {
      patient: req.body.patient,
      dentNumber: req.body.dentNumber,
      diagnosis: req.body.diagnosis,
      price: req.body.price,
      date: req.body.date,
      time: req.body.time,
   };

   try {
      const appoitment = await Appoitment.findOne({_id: appoitmentId});
   } catch {
      return res.status(404).json({
         status: false,
         message: "PATIENT_NOT_FOUND"
      });
   }

   if(!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
   }

   Appoitment.updateOne(
      {_id: appoitmentId},
      {$set: data }
      ).then((doc) => {

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
   .sort({date: 1, time: 1})
   .populate('patient')

   .then((docs) => 
      res.status(201).json({
         status: true,
         data: reduce(groupBy(docs, 'date'), (result, value, key) => {
            result = [...result, {title: key, data: value}];
            return result;
         },[])
      }))
      
      .catch((err) => {
      return res.status(500).json({
         status: false,
         message: err
      });
   });
}

AppoitmentController.prototype = {
   all, 
   create,
   remove,
   update
}

module.exports = AppoitmentController;