const express = require('express');
const { getAllUsers, registerUser, loginUser } = require('../controllers/userControllers');
const router = express.Router();

router.get('/getAllUsers',getAllUsers);
router.post('/register',registerUser);
router.post('/login',loginUser);

module.exports = router;