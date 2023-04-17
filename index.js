const cors = require('cors');
const express = require('express');
const { query } = require('express-validator');

const db = require("./core/db");
const { PatientCtrl } = require('./controllers');

const app = express();
app.use(express.json())
app.use(cors())

app.get('/patients', PatientCtrl.all);
app.post('/patients', PatientCtrl.create);

app.listen(6666, function(err) {
   if(err) {
      return console.log(err)
   }
   console.log('server runned')
})