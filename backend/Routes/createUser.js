const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const jwtSecret = "WorkableWebApp"
// Route to create a new user
// POST request to /createuser
// Validates input fields and hashes the password before saving to the database
router.post("/createuser", [
    body('first_name', 'First name is required').notEmpty(),
    body('last_name', 'Last name is required').notEmpty(),
   body('email').isEmail(),
   body('password', 'Incorrect Password').isLength({ min: 5 })
  ],


   async (req, res) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

const salt = await bcrypt.genSalt(10);

let secPassword = await bcrypt.hash(req.body.password, salt)
// let secRepeat_Password = await bcrypt.hash(req.body.repeat_Password, salt)

      try {
         await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password:secPassword,
            email: req.body.email
         }).then(res.json({ success: true }));
      } catch (error) {
         console.log(error)
         res.json({ success: false });
      }
   })

// Route to login a user
// POST request to /loginuser
// Validates input fields and compares the provided password with the stored hashed password

router.post("/loginuser", [

   body('email').isEmail(),
   body('password', 'Incorrect Password').isLength({ min: 5 })],

   async (req, res) => {


      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      let email = req.body.email;
      try {
         let userData = await User.findOne({email});
         if (!userData) {
            return res.status(400).json({ errors: "Try logging with correct credentials" })
         }


          const pwdCompare = await bcrypt.compare(req.body.password,userData.password)
         if (!pwdCompare) {
            return res.status(400).json({ errors: "Try logging with correct credentials" })
         }

         const data = {
            user:{
               id:userData.id
            }
         }

const authToken = jwt.sign(data,jwtSecret)
         return res.json({ success: true,authToken:authToken })
      } catch (error) {
         console.log(error)
         res.json({ success: false });
      }
   })


module.exports = router;