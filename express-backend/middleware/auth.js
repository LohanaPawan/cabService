// const jwt = require('jsonwebtoken')
// module.exports = (req, res, next) => {
//   const authHeader = req.get("Authorization")
//   if(!authHeader){
//       return res.status(401).json({error: "Missing authorization header"});

//   }
// try{
//     const token = authHeader;
//     jwt.verify(token, jwtSecret)
//     next();
// }catch(err){
//    return res.status(401).json(err)
// }
  
// }