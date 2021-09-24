const express = require('express');
const user = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const TOKEN_SECRET = "skjegfkjsfbwfbwrfbw";
const authuser=require('../middleware/Auth');


router.post('/', [body('email', 'provide a right email').isEmail(),
body('password', 'password must be min 5 charactors').isLength({ min: 5 }),
body('name', 'name must be min 3 charctors').isLength({ min: 3 }),
], async (req, res) => {
  try {

    let data = await user.findOne({ email: req.body.email })
    if (data) {
      return res.status(400).json({ error: "Email is already registerred in the database" });
    }
    else {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      var salt = bcrypt.genSaltSync(10);
      var hashpassword = await bcrypt.hash(req.body.password, salt);

      user.create({
        name: req.body.name,
        password: hashpassword,
        email: req.body.email,
      }).then(user => {
        var data = {
          user: {
            id: user.id,
          }
        }
        const token = jwt.sign(data, TOKEN_SECRET);
        
    
        res.json({
          success: true,
          token: token,
        })
      })
        .catch(err => console.log(err));
    }
  }
  catch (error) {
    console.error(error.message);
  }

})

router.post('/login', [body('email', 'Email does not exist').isEmail(),
body('password', 'password must be min 5 charactors').isLength({ min: 5 }),
], async (req, res) => {
  const { email, password } = req.body;

  try {
    const User = await user.findOne({ email: email });
    if (!User) {
      res.json({ error: "Invalid login details!" })
    }
    else {

      const cmppass = await bcrypt.compare(password, User.password);

      if (cmppass) {
        var data = {
          user: {
            id: User.id,
          }
        }
        const token = jwt.sign(data, TOKEN_SECRET);
      
    
    
        res.json({
          token: token,
          success: true,
        })
      }
      else {
        res.json({ error: "Invalid login details" });
      }
    }
  }
  catch (error) {
    console.error(error.message);
  }

  })

  router.post('/auth', [body('email', 'Email does not exist').isEmail(),
body('password', 'password must be min 5 charactors').isLength({ min: 5 }),
],authuser, async (req, res) => {
   try {
     const getuser=await user.findById(req.user.id);
     res.send(getuser);
   } catch (error) {
    console.error(error.message);
    res.send(error);
   }
})

module.exports = router;