import jwt from 'jsonwebtoken';

const auth=(req,res,next)=>{

    // check token
    const token=req.header('Authorization');
        
    if(!token){
        return res.status(401).json({message:"Access Denied! "});
    }

    try{
        const decodedToken = jwt.verify(token,process.env.TOKEN_KEY);
        req.user=decodedToken;

        next();
    }
    catch(error){
        res.status(401).json({message:"Invalid Token"})
    }

}

export default auth;