const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

//Login
module.exports.sign_in = async function(req, res) {
    const candidate = await User.findOne({email: req.body.email})
  
    if (candidate) {
      // password check, user exists
      const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
      if (passwordResult) {
        // token generation, password match
        const token = jwt.sign({
          email: candidate.email,
          userId: candidate._id
        }, keys.jwt, {expiresIn: 60 * 60})
  
        res.status(200).json({
          token: `Bearer ${token}`
        })
      } else {
        // password doesn't match
        res.status(401).json({
          message: 'Most likely your username or password was entered incorrectly.'
        })
      }
    } else {
      // User not found
      res.status(404).json({
        message: 'User was not found. Please check your credentials.'
      })
    }
}
  
//Register
module.exports.sign_up = async function(req, res) {
    // input: email, password
    const candidate = await User.findOne({email: req.body.email})
  
    if (candidate) {
      // User already exists
      res.status(409).json({
        message: 'User with this email already existing. Try another one.'
      })
    } else {
      // Creating new user
      const salt = bcrypt.genSaltSync(10)
      const password = req.body.password
      const user = new User({
        email: req.body.email,
        password: bcrypt.hashSync(password, salt)
      })
  
      try {
        await user.save()
        res.status(201).json(user)
      } catch(e) {
        errorHandler(res, e)
      }
  
    }
}