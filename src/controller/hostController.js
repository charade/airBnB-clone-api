const { response } = require('express');
const jwt = require('jsonwebtoken');
const host = require('../model/hostModel');
const utils = require('../model/modelUtils');
require('dotenv').config();

// Add a place
exports.add_a_place = async (req, res) => {
  const token = req.body.token;
  try{
    const user = await jwt.verify(token, process.env.SECRET);
    let city_name = req.body.city_name
    /// before adding a place we check if it exists
    const city = await utils.get_a_city_byName(city_name);
    if (city[0].length !== 0) {
      const city_id = city[0][0].id;
      console.log("city id "+city_id)
      console.log(user.id)
      await host.add_a_place(user.id, req.body, city_id);
      res.status(200).json({ message: 'successfully added a place!' });
      return;
    }
    res.json({ message: 'city not found!' });
  }catch(err){
    res.status(500).json({err})
  }
 
};

// Delete a place
exports.delete_a_place = async(req, res) => {
  const {token , place_id} = req.body;
  console.log(token,place_id)
  try {
    const user = await jwt.verify(token, process.env.SECRET);
    const user_id = user.id;
    host.delete_a_place(place_id, user_id);
    console.log('done')
    res.status(200).json({message : { message: 'succesfully deleted' }});
  } catch (err) {
    console.log(err)
  }
};

// Get host's places list
exports.get_host_places_list = async (req, res) => {
  const { user_id } = req.params;
  try {
    const places = await host.get_places_in_rent_list(user_id);

    if (places[0][0].length !== 0) {
      res.status(200).json({ message: 'success!', response });
      return;
    }
    res.status(400).json({ message: 'not found!' });
  } catch (err) {
    res.status(500).json({ message: 'connection failed!' });
  }
};

// Host can change a place's info
exports.modify_place_info = async (req, res) => {
  
  let place_id = Number(req.params.place_id);
  const { data, token } = req.body;
  const user= await jwt.verify(token, process.env.SECRET);
  const user_id = user.id;

  
  try {
    await host.editInfo(data, place_id, user_id);
    res.status(200).json({ message: 'data edited' });
  } catch (err) {
    console.log(err);
  }
};

// All places booked
exports.all_host_booked_places = async (req, res) => {
  const { user_id } = req.params;
  
  try {
    const rentBookedPlaces = await host.all_booked_places(user_id);

    if (rentBookedPlaces[0][0].length === 0) {
      res.status(400).json({ message: 'no places booked' });
      return;
    }

    const bookedPlaces = [...rentBookedPlaces[0]];
    res.status(200).json({ message: 'success!', response: bookedPlaces });
  } catch (err) {
    res.status(500).json({ message: 'connection failed!' });
  }
};
