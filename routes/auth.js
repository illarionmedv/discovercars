const express = require('express')
const controller = require('../controllers/auth')
const router = express.Router()
const assert = require('assert')

const db_url = '';

// localhost:5000/api/auth/sign_in
router.post('/sign_in', controller.sign_in)

// localhost:5000/api/auth/sign_up
router.post('/sign_up', controller.sign_up)

module.exports = router