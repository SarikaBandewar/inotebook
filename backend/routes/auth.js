const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Create a user using :POST "/api/auth/createUser"
router.post(
  '/createUser',
  [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 character').isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        res.status(400).json({
          error:
            'User with specified email found in db, please specify unique emailid',
        });
      }
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      //   .then((user) => res.json(user))
      //   .catch((err) => {
      //     console.log(err);
      //     res.json({
      //       error: 'Please enter a unique email',
      //       message: err.message,
      //     });
      //   });
      res.json({ flag: 'successful' });
    } catch (error) {
      console.log(error);
      res.status(500).send('Some error occured!');
    }
  }
);

module.exports = router;
