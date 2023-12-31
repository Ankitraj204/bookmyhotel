import User from "../models/Users.js"
import bcrypt from "bcryptjs"
import createError from "http-errors"
import jwt from "jsonwebtoken"

export const register = async(req,res,next)=>{
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password,salt);

        const newUser = new User({
            Username:req.body.Username,
            email:req.body.email,
            password:hash
        })

        await newUser.save();
        res.status(200).send("User has been saved!");
    }
    catch(err){
        next(err)
    }
};

export const login = async(req,res,next)=>{
    try{
        const user = await User.findOne({Username: req.body.Username});
        if(!user) return next(createError(404, "User not found!"));

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
            );
        if(!isPasswordCorrect) return next(createError(400, "wrong password or username!"));
        
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin },process.env.JWT);
        
        const { password, isAdmin, ...otherDetails } = user._doc;//to prevent passing password and admin to the react app or client side
        
        res
        .cookie("access_token", token,{
            httpOnly: true,
        })
        .status(200)
        .json({...otherDetails});
    }
    catch(err){
        next(err);
    }
};