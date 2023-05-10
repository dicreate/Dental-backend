const { Patient } = require('../models')
const { validationResult} = require('express-validator');

function PatientController() { }

const create = function(req, res) {
   const errors = validationResult(req);
   
   const data = {
      fullname: req.body.fullname, 
      phone: req.body.phone, 
   };

   if(!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
   }

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

const remove = async function (req, res) {

   const id = req.params.id;

   try {
      const patient = await Patient.findOne({_id: id});
      
      if (patient == null) {
         return res.status(404).json({
            status: false,
            message: "PATIENT_NOT_FOUND"
         });
      }
   } catch(err) {
      return res.status(404).json({
         status: false,
         message: "PATIENT_NOT_FOUND"
      });
   }

   Patient.deleteOne({_id: id}).then(() => {
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

   const patientId = req.params.id;
   const errors = validationResult(req);

   const data = {
      fullname: req.body.fullname, 
      phone: req.body.phone, 
   };

   try {
      const patient = await Patient.findOne({_id: patientId});
   } catch {
      return res.status(404).json({
         status: false,
         message: "PATIENT_NOT_FOUND"
      });
   }

   if(!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
   }

   Patient.updateOne(
      {_id: patientId},
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

const show = async function(req, res) {

   const patientId = req.params.id;

   try {
      const patient = await Patient.findById(patientId).populate('appoitments').exec();

      res.json({
      status: 'success',
      data: {...patient._doc, appoitments: patient.appoitments}
     })
   } catch (err) {
      return res.status(404).json({
         status: false,
         message: "PATIENT_NOT_FOUND"
      });
   }
}

PatientController.prototype = {
   all, 
   create,
   update, 
   remove,
   show
}

module.exports = PatientController;