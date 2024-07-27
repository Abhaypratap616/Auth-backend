const jwt = require('jsonwebtoken');
require('dotenv').config();

 exports.auth = (req, res, next) => {
try{
    const token = req.body.token
    if(!token){
        return res.status(401).json({message: 'Unauthorized'});
    }
    
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = decoded;
       
    }
    catch(err){
        return res.status(401).json({message: 'token is unvaild'});
    }
    next();
}

catch(err){
    console.log(err);
    return res.status(500).json({message: 'Internal server error'});
};

}

exports.isstudent = (req, res, next) => {

   try{
    if(req.body.role !== 'student'){
        return res.status(403).json({message: 'this route is only for student'});
    }
    next();
   }
    catch(err){
         console.log(err);
         return res.status(500).json({message: 'Internal server error'});
    }
};
    
exports.isAdmin = (req, res, next) => {
    try{
        if(req.body.role !== 'admin'){
            return res.status(403).json({message: 'this route is only for admin'});
        }
        next();
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: 'Internal server error'});
    }
};