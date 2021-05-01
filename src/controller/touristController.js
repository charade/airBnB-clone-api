const { response } = require('express');
const touristModel = require('../model/touristModel');
const modelUtils = require('../model/modelUtils')

exports.add_place_to_bookmarks = async (request, response) =>{

    const { user_id, place_id } = request.params;
    const { check_in, check_out } = request.query;
    const date = { in : check_in, out: check_out };

    try{
        //format ISO date to mysql TIMESTAMP
        date.in = new Date(date.in).toISOString().replace('T', ' ').replace('Z', "").slice(0,19);
        date.out = new Date(date.out).toISOString().replace('T', ' ').replace('Z', "").slice(0,19);
        await touristModel.book_a_place(user_id, place_id, date);
        response.status(200).json({message : "booked"});
    }
    catch(err){
        response.status(500).json({ err : "can't connect" + err })
    }
}

//cancel from bookmarks
exports.cancel_booked_place = async (req, res)=>{
    const {user_id, booking_id} = req.params;
   console.log(user_id, booking_id);
    try{

        await touristModel.cancelBooking(user_id, booking_id);
        res.status(200).json({ message: 'succesfully deleted' });
    }
    catch(err){
        res.status(500).json({ error : err });
    }
}
//all place booked by tourist

exports.all_places_booked = async (req, res)=>{
    const {user_id} = req.params;
    
    try{
        const response = await touristModel.get_all_booked_places(user_id);
        res.status(200).json({ response : response[0] });
    }
    catch(err){
        console.error(err);
    }
}
