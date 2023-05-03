const cors = require('cors');
const express = require('express');

const db = require("./core/db");
const { patientValidation, appoitmentValidation } = require('./utils/validations/index');
const { PatientCtrl, AppoitmentCtrl } = require('./controllers');
const { Appoitment } = require('./models');

const app = express();
app.use(express.json())
app.use(cors())

app.get('/patients/',  PatientCtrl.all);
app.post('/patients', patientValidation.create, PatientCtrl.create);
app.patch('/patients/:id', patientValidation.create, PatientCtrl.update);
app.delete('/patients/:id', PatientCtrl.remove);
app.get('/patients/:id',  PatientCtrl.show);

app.get('/appoitments',  AppoitmentCtrl.all);
app.post('/appoitments',  appoitmentValidation.create, AppoitmentCtrl.create);
app.delete('/appoitments/:id',  AppoitmentCtrl.remove);
app.patch('/appoitments/:id',appoitmentValidation.create, AppoitmentCtrl.update);

app.listen(6666, function(err) {
   if(err) {
      return console.log(err)
   }
   console.log('server runned')
})