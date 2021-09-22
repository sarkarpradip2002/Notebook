const jwt=require('jsonwebtoken');
const TOKEN_SECRET = "skjegfkjsfbwfbwrfbw";

const authuser=(req,res,next)=>{
   let token=req.header('auth-token');
   if(!token)
   {
       res.json({error: "Token is not authenticated"})
   }
   else{
       const verify=jwt.verify(token,TOKEN_SECRET);
       console.log(verify);
       if(!verify)
       {
           res.send({error: "Token is not verified"})
       }
       else{
        req.user=verify.user;   
       next();
       }
   }
}

module.exports=authuser;