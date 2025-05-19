const {addUser,userLogin, getAllUser,
    deleteUser} = require('../controllers/userControllers');
const express = require('express');
const route = express.Router();
const authentication = require('../middleware/authentication')



route.post('/register', addUser);
route.post('/login', userLogin);
route.get('/',getAllUser);
route.get('/checkout', authentication, (req, res) => {
  res.status(200).json({
    message: `Welcome to checkout, ${req.user.username}`
  });
});
route.delete('/:id',deleteUser);

module.exports = route ;


