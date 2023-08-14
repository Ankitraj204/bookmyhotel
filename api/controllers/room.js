 import Room from "../models/Rooms.js"
 import Hotel from "../models/Hotels.js"
 //import { createError } from "http-errors"

 export const createRoom = async(req,res,next)=> {
    const hotelId = req.params.hotelid;//in the url
    const newRoom = new Room(req.body);//new room details from the user

    try{
        const savedRoom = await new Room.save();//save in the rooms.js
        try{
            //find the hotel by id and update the rooms array in it by pushing id in it
            await Hotel.findByIdAndUpdate(hotelId,{
                $push: { rooms: savedRoom._id },
            });
        }catch(err){
            next(err);
        }
        res.ststus(200).json(savedRoom);
    }
    catch(err){
        next(err);
    }
 };

 export const updateRoom = async (req, res, next) => {
    try {
      const updateRoom = await Room.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updateRoom);
    } catch (err) {
      next(err);
    }
  };
  export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;//in the url
    //new room details from the user

    try{
        await Room.findByIdAndDelete(req.params.id);
        try{
            //find the hotel by id and update the rooms array in it by pushing id in it
            await Hotel.findByIdAndUpdate(hotelId,{
                $pull: { rooms: req.params.id },
            });
        }catch(err){
            next(err);
        }
        res.ststus(200).json(savedRoom);
    }
    catch(err){
        next(err);
    }
  };
  export const getRoom = async (req, res, next) => {
    try {
      const room = await Room.findById(req.params.id);
      res.status(200).json(room);
    } catch (err) {
      next(err);
    }
  };
  export const getRooms = async (req, res, next) => {
    const { min, max, ...others } = req.query;
    try {
      const rooms = await Room.find();
      res.status(200).json(rooms);
    } catch (err) {
      next(err);
    }
  }; 