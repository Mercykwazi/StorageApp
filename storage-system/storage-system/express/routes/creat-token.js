require("dotenv").config();
var jwt = require('jsonwebtoken');
module.exports=function generateToken(user , authority) {
  var u = {
   name: user.name,
   email: user.email,
   authority:authority
  };
  console.log("it",process.env.JWT_SECRET)
  return token = jwt.sign(u, process.env.JWT_SECRET, {
     expiresIn: 60 * 60 * 24 
  });
}