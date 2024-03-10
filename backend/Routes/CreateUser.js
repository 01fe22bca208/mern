

// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');

// router.post("/createuser", async (req, res) => {
//     try {
//         await User.create({
//             name: "Shyam Das",
//             password: "123456",
//             email: "shyamdas@gmail.com",
//             location: "QWerty edrfef"
//         });

//         res.json({ success: true });
//     } catch (error) {
//         console.error(error);
//         res.json({ success: false });
//     }
// });

// module.exports = router;
// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const { connectToMongo } = require('../db'); // Import the connectToMongo function
// const {body,validationResult}=require('express-validator')
// router.post("/createuser", async (req, res) => {
//     try {
//         // Ensure the connection is established before creating the user
//         await connectToMongo();


//         await User.create({
//             name: req.body.name,
//             password: req.body.password,
//             email: req.body.email,
//             location: req.body.location
//         });

//         res.json({ success: true });
//     } catch (error) {
//         console.error(error);
//         res.json({ success: false });
//     }
// });

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const { connectToMongo } = require('../db');
// const { body, validationResult } = require('express-validator');

// router.post(
//   '/createuser',
//   [
//     // Validate name, email, password, and location fields
//     body('name').notEmpty().withMessage('Name is required'),
//     body('email').isEmail().withMessage('Invalid email address'),
//     body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
//     body('location').notEmpty().withMessage('Location is required'),
//   ],
//   async (req, res) => {
//     try {
//       // Ensure the connection is established before creating the user
//       await connectToMongo();

//       // Check for validation errors
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }

//       // Create the user
//       await User.create({
//         name: req.body.name,
//         password: req.body.password,
//         email: req.body.email,
//         location: req.body.location,
//       }).then(

//         res.json({ success: true }))
//     } catch (error) {
//       console.log(error);
//       res.json({ success: false });
//     }
//   }
// )



// router.post(

//   '/loginuser', [
//   body('email').isEmail(),
//   body('password', 'Incorrect Password').isLength({ min: 5 })
// ]
//   , async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     let email = req.body.email
//     try {


//       // Create the user
//       let userData = await User.findOne({ email });
//       if (!userData) {
//         return res.status(400).json({ errors: "Try logging with correct credential" })
//       }
//       if (!req.body.password === userData.password) {

//         return res.status(400).json({ errors: "Try logging with correct credential" })
//       }

//       return res.json({ success: true })
//     } catch (error) {
//       console.log(error);
//       res.json({ success: false });
//     }
//   }
// )

// module.exports = router;



const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { connectToMongo } = require('../db');
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const jwtSecret = "MynameisEndtoEndYouTubeChannel$#"
const bcrypt=require("bcryptjs");
router.post(
  "/createuser",
  [
    // Validate name, email, password, and location fields
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 6 characters'),
    body('location').notEmpty().withMessage('Location is required'),
  ],
  async (req, res) => {
   
      // Ensure the connection is established before creating the user
      await connectToMongo();

      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
     const salt = await bcrypt.genSalt(10);
     let secPassword = await bcrypt.hash(req.body.password,salt);
      try { // Create the user
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      })

     .then( res.json({ success: true }))
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post("/loginuser",
  [
    body('email').isEmail(),
    body('password','Incorrect Password').isLength({ min: 5 })
  ],
  async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;
    try {
      // Find the user
      let userData = await User.findOne({ email });

      if (!userData) {
        return res.status(400).json({ errors: "Try logging in with correct credentials" });
      }
      const pwtCompare = await bcrypt.compare(req.body.password,userData.password)
      // Compare passwords
      if (!pwtCompare) {
        return res.status(400).json({ errors: "Try logging in with correct credentials" });
      }
      const data={
       user: {
        id:userData.id

        }
      }
      const authToken = jwt.sign(data,jwtSecret)
      return res.json({ success: true,authToken:authToken});
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
