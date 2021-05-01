const { response } = require('express');
const host = require('../model/hostModel');
const utils = require('../model/modelUtils');


// Add a place
exports.add_a_place = async(req, res) => {
    
    const {user_id, city_name} = req.params;
    ///before adding a place we check if it exists
    const city = await utils.get_a_city_byName(city_name);
    console.log(city[0])
    if(city[0].length !== 0){
        const city_id = city[0][0].id;
        await host.add_a_place(user_id,req.body, city_id);
        res.status(200).json({message: "successfully added a place!"});
        return;
    }
    res.status(400).json({message: "city not found!"})
}


// Delete a place
exports.delete_a_place = (req, res)=>{
    const {place_id, user_id} = req.params;
    try{
        host.delete_a_place(place_id, user_id);
        res.status(200).json({ message: 'succesfully deleted' });
    }
    catch(err){
        res.status(500).json({err: err});
    }
}


//Get host's places list
exports.get_host_places_list = async(req, res)=>{
    const {user_id} = req.params;
    try{
        const places = await host.get_places_in_rent_list(user_id);
       
        if(places[0][0].length !== 0){
            res.status(200).json({message: "success!", response: response});
            return;
        }
        res.status(400).json({message: "not found!"})
    }
    catch(err){
        res.status(500).json({message: "connection failed!"})
    }
}

// Host can change a place's info
exports.modify_place_info = async (req, res)=>{
    const {column, place_id} = req.params;
    const {newValue} = req.body;
    try{
        await host.editInfo(column, newValue, place_id)
        res.status(200).json({message: 'data edited'})
    }
    catch(err){
        res.status(500).json({message: err})
    }
}

// All places booked
exports.all_host_booked_places = async(req, res)=>{
    const{user_id} = req.params;
    try{
        const rentBookedPlaces = await host.all_booked_places(user_id);
        console.log(rentBookedPlaces)
        if(rentBookedPlaces[0][0].length === 0){
            res.status(400).json({message: "no places booked"});
            return;
        }
        const bookedPlaces = [...rentBookedPlaces[0]]
        res.status(200).json({message: "success!", response: bookedPlaces});
    }
    catch(err){
        res.status(500).json({message: "connection failed!"})
    }
}

