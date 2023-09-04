const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchUser = require('../middleware/fetchuser');

const JWT_SECRET = 'dinkuMylove#';

//ROUTE 1:  Create a user using :POST "/api/auth/createUser"
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
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // user creation
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      console.log(authToken);
      // return success
      res.json({ flag: 'successful', token: authToken });
    } catch (error) {
      // log and return error
      console.log(error);
      res.status(500).send('Some error occured!');
    }
  }
);

//ROUTE 2: authenticate a user
router.post(
  '/login',
  [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email: email });
      if (!user) {
        return res
          .status(400)
          .json({ error: 'Please try to login using correct credentials' });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: 'Please try to login using correct credentials' });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(payload, JWT_SECRET);
      res.json({ authtoken: authToken });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error while login');
    }
  }
);

//ROUTE 3: get logged in user deatails POST "/api/auth/getuser"
router.post('/getuser', fetchUser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while data');
  }
});

module.exports = router;
