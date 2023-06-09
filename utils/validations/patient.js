const { check } = require('express-validator')

const validation = {
   create: [
      check('fullname').isLength({min: 4}), 
      check('phone').isLength({min: 4})
   ]
}

module.exports = validation;

