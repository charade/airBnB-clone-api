const touristModel = require('../model/touristModel');
const modelUtils = require('../model/modelUtils');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.add_place_to_bookmarks = async (request, response) => {
  const { user_id, place_id, check_in, check_out, token  } = request.body;
  
  const date = { in: check_in, out: check_out };

  try {

    const user = await jwt.verify(token, process.env.SECRET);
    // format ISO date to mysql TIMESTAMP
    date.in = new Date(date.in).toISOString().replace('T', ' ').replace('Z', '')
      .slice(0, 19);
    date.out = new Date(date.out).toISOString().replace('T', ' ').replace('Z', '')
      .slice(0, 19);
    await touristModel.book_a_place(user.id, place_id, date);
    response.status(200).json({ message: 'booked' });
  } catch (err) {
    // response.status(500).json({ err: `can't connect${err}` });
    console.log(err)
  }
};

// cancel from bookmarks
exports.cancel_booked_place = async (req, res) => {
  const { user_id, booking_id } = req.params;

  try {
    await touristModel.cancelBooking(user_id, booking_id);
    res.status(200).json({ message: 'succesfully deleted' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
// all place booked by tourist

exports.all_places_booked = async (req, res) => {
  const { token } = req.body;
  try {
    const user = await jwt.verify(token, process.env.SECRET)
    const user_id  = user.id;
    const response = await touristModel.get_all_booked_places(user_id);
    res.status(200).json({ response: response[0] });
  } catch (err) {
    console.log(err)
  }
};

exports.search_places_byDate = async (req, res) => {
  const {date} = req.body;
  try {
    const response = await touristModel.get_all_places();
    const array = response[0].filter((el) => el.available === date);
    res.status(200).json({ data: array });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.search_places_byCity = async (req, res) => {
  const { city_name } = req.body;
  try {
    const getCityArr = await modelUtils.get_a_city_byName(city_name);
    if (getCityArr[0].length !== 0) {
      const city_id = getCityArr[0][0].id;
      const placesArr = await modelUtils.all_places_in_the_city(city_id);
      const data = placesArr[0]
      console.log(data)
      res.status(200).json({ data });
      return;
    }
    res.status(400).json({ message: 'city not found!' });
  } catch (err) {
    console.log(err);
  }
};
