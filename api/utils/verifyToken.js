import jwt from "jsonwebtoken"
import createError from "http-errors";

export const verifyToken = (req,res,next) => {
    const token = req.cookies.access_token;//store the token
    if(!token) return next(createError(401, "You are not authenticated!"));
    
    //if it does then verify the token with the security key stored
    jwt.verify(token,process.env.JWT, (err,user) => {
        if(err) return next(createError(403, "Token is not valid!"));
        req.user = user;//pass the info
        next();//move to next operation
    });
};

export const verifyUser = (req,res,next)=>{
    verifyToken(req,res,next, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){//if the user in token and in params are same then it can del/update
            next();
        }else{
            return next(createError(403, "You are not authorized!"));
        }
    })
}

export const verifyAdmin = (req,res,next)=>{
    verifyToken(req,res,next, ()=>{
        if(req.user.isAdmin){//if the user in token and in params are same then it can del/update
            next();
        }else{
            return next(createError(403, "You are not authorized!"));
        }
    })
}