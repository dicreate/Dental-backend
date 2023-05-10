const mongoose = require('mongoose');
const { Schema } = require('mongoose');

 const PatientSchema = new Schema({
    id: String, 
    fullname: String, 
    phone: String,
 },
 {
   timestamps: true
 })

PatientSchema.virtual('appoitments', {
  ref: 'Appoitment',
  localField: '_id',
  foreignField: 'patient',
  justOne: false
})

 const Patient = mongoose.model('Patient', PatientSchema);

 module.exports = Patient;