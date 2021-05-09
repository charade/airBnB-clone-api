const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const utils = require('../model/modelUtils');
require('dotenv').config();

/// ///////// signup///////
exports.signUp = async (req, res) => {
  const {email, password, first_name, last_name, role} = req.body;

  try {
    const regEmail = /^([a-z A-Z 0-9](\.)?)+@\w+\.(\w){2,4}$/;
    const regRole = /^(hote|touriste)$/;

    if (regEmail.test(email) && regRole.test(role)) {
      const hash = await bcrypt.hash(password, 10);
      const user = {
        first_name,
        last_name,
        email,
        role,
        password: hash,
      };
      const userAlreadyexistsArr = await utils.getUser(email, role);

      if (userAlreadyexistsArr[0].length === 0) {
        await utils.createAccount(user);
        res.status(200).json({ message: 'user registered' });
        return;
      }
      res.status(403).json({ message: 'email already exists' });
    } else {
      if (!regEmail.test(email)) {
        res.status(403).json({ err: 'mauvais format Email' });
        return;
      }
      res.status(403).json({ err: 'les rôle disponible sont touriste ou hote' });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

//login  
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const resp = await utils.login(email);
    
    if (resp[0].length !== 0) {
      
      const checkPassword = await bcrypt.compare(password, resp[0][0].password);
      
      if (checkPassword) {
        next();
      } else {
        res.status(403).json({ message: 'invalid password' });
      }
      return;
    }
    res.status(404).json({ message: "user doesn't exist" });
  } catch (err) {
    res.status(200).json({ error: {email, password} });////
  }
};

//////////////////////////////
exports.authentication = async (req, res) => {
  const { email } = req.body;
  const { role } = req.params;
  
  try {
    const userResponse = await utils.getUser(email);//
    
    const user = {
      email,
      first_name: userResponse[0][0].first_name,
      id: userResponse[0][0].id
    };
    
    const token = await jwt.sign(user, process.env.SECRET);
    res.status(200).json({ token: token, role : userResponse[0][0].role });
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

exports.getAllPlaces = async(req,res) =>{
  
  try{
    const response = await utils.all_places();
    const data = response[0]
    res.status(200).json({ data});
  }
  catch(err){
    console.error(err)
  }
}

exports.get_a_place_info = async(req, res) =>{
    const {id} =  req.params;
    try{
      const response = await utils.get_a_place_info(id);
      const data = response[0][0];
      
      const city = await utils.get_a_city_byId(data.cities_id);
      data.city = city[0][0].name;
      delete data.password;
      res.status(200).json({ data });
      
    }
    catch(err){
      console.log(err)
    }

}
