const cors = require('cors');
const express = require('express');

const db = require("./core/db");
const patientValidation = require('./utils/validations/patient');
const { PatientCtrl } = require('./controllers');

const app = express();
app.use(express.json())
app.use(cors())

app.get('/patients',  PatientCtrl.all);
app.post('/patients', patientValidation.create, PatientCtrl.create);

app.listen(6666, function(err) {
   if(err) {
      return console.log(err)
   }
   console.log('server runned')
})