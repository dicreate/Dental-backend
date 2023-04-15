const { Patient } = require('../models')

function PatientController() {
   Patient.create(data, function(err, doc) {

      if (err) {
         return res.json({
            status: 'error',
            message: err
         })
      }

      req.json({
         status: 'success',
         data: doc
      })

   })
}

PatientController.prototype.add = function(req, res) {

}

PatientController.prototype.all = function (req, res) {
   Patient.find({}, function (err, docs) {
      if (err) {
         return res.status(500).json({
            status: 'error',
            message: err
         })
      }

      req.json({
         status: 'success',
         data: docs
      })
   })
}

module.exports = PatientController;