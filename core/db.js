const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/DentalApplication', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
   }).catch(function(err) {
      throw Error(err);
   });

module.exports = mongoose;