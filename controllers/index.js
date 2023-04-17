const PatientController = require("./PatientController");
const AppoitmentController = require('./AppoitmentController');

module.exports = {
   PatientCtrl: new PatientController(),
   AppoitmentCtrl: new AppoitmentController()
}