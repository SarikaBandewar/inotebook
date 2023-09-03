const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Create a user using :POST "/api/auth/createUser"
router.post(
  '/createUser',
  [
    // request data validator using express-validator
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 character').isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    // return errors if present
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    // check email in collection, otherwise insert user
    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        res.status(400).json({
          error:
            'User with specified email found in db, please specify unique emailid',
        });
      }
      // user creation
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      // return success
      res.json({ flag: 'successful' });
    } catch (error) {
      // log and return error
      console.log(error);
      res.status(500).send('Some error occured!');
    }
  }
);

module.exports = router;
