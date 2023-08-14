import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/users.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

/*router.get("/checkauthentication", verifyToken, (req,res,next)=>{
    res.send("Hello User, You are logged in!")
})

router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
    res.send("Hello User, You are logged in and can del and update!")
})

router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
    res.send("Hello Admin, You are logged in and can del and update all accounts!")
})*/


//UPDATE

router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET

router.get("/:id",verifyUser, getUser);

//GET ALL

router.get("/",verifyAdmin, getUsers);


export default router;