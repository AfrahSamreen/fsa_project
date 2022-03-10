const express = require('express');
const userCtrl = require('../controllers/userCtrl');
const tokenAuth = require('../middlewares/tokenAuth');
const authorize = require('../middlewares/authorize');
const router = express.Router();

// public
router.post('/signup', userCtrl.register);
router.post('/signin', userCtrl.signin);

// candidate
router.put('/:email', tokenAuth, userCtrl.update);

// recruiter
router.get('/page/:page/size/:size', tokenAuth, authorize.authorizeRecruiter, userCtrl.getUsers);
router.get('/', tokenAuth, authorize.authorizeRecruiter, userCtrl.getUsers);
router.get('/:email', tokenAuth, authorize.authorizeRecruiter, userCtrl.getUserByEmail);

// admin
router.post('/recruiter/signup', tokenAuth, authorize.authorizeAdmin, userCtrl.addRecruiter);
// http://localhost:3000/api/users/page/10/size/100

module.exports = router;
