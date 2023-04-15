const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();

app.use(bodyParser.json({

}))

app.use(cors())

app.get('/test', function(req, res) {
   console.log(req.params)

   return res.send('Hello');
})

app.listen(6666, function(err) {
   if(err) {
      return console.log(err)
   }
   console.log('server runned')
})