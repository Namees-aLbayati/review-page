const express1 = require('express').Router()

// Import our modular routers for /tips and /feedback
const adviceRoute = require('./advace');


express1.use('/api', adviceRoute);


module.exports = express1;
