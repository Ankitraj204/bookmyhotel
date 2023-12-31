import express from "express";
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controllers/hotel.js";

const router = express.Router();
import {verifyAdmin} from "../utils/verifyToken.js"


//CREATE
router.post("/", verifyAdmin, createHotel);

//UPDATE
router.put("/:id",verifyAdmin, updateHotel);

//DELETE
router.delete("/:id",verifyAdmin, deleteHotel);

//GET
router.get("/find/:id",getHotel);

//GET ALL
router.get("/",getHotels);
router.get("/countByCity",countByCity);
router.get("/countByType",countByType);

export default router;