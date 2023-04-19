const mongoose = require('mongoose');
const { Schema } = require('mongoose');

 const AppoitmentSchema = new Schema({
    patient: { type: Schema.Types.ObjectId, ref: "Patient" }, 
    dentNumber: Number, 
    diagnosis: String, 
    price: Number,
    date: String,
    time: String,
 },
 {
   timestamps: true
 })

 const Appoitment = mongoose.model('Appoitment', AppoitmentSchema);

 module.exports = Appoitment;