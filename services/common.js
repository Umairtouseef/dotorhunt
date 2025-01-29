const passport = require("passport");
require("dotenv").config();


 
exports.isAuth = (req, res, done) => {   
  return passport.authenticate("jwt");
};
 
exports.cookieExtractor = function (req) {  
  let token = null;
  if (req && req.cookies) { 
    token = req.cookies["jwt"];   
  }   
  // token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjgzOWQyNDA4NTM4Y2JiNjI3Y2M3ZiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzEzOTEzNzczfQ.09DE4NCgjIFZYHaeyRDvmfJG2VUCi8pIhoLfpxwP2kE";
   return token;  
};    

exports.sanitizeUser = (user) => {
    return { id: user.id, role: user.role };
  
  }; 