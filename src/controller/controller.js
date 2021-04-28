const model = require ('../model/model');
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const { response } = require('express');
require('dotenv').config();




 //////////// signup///////
exports.signUp = async(req, res) => {
    
const{email, password, first_name, last_Name, role} = req.body;
   try {
      const regEmail = /^(\w+)@(\w+)\.(\w{2,})$/;
      const regRole = /^(hote|touriste)$/gi;
      if(regEmail.test(email) && regRole.test(role) ){
          
            const hash = await bcrypt.hash(password,10);

            const user = {
                first_name : first_name,
                last_Name :last_Name,
                email : email,
                role : role,
                password:hash
            }

            model.createAccount(user, (err, resp) =>{
                if(err){
                    res.status(500).json({err:"connection to database failed"});
                }
                res.status(200).json({message:"user registered"});
            })
      }
      else{
          
          !regEmail.test(email) ? res.status(400).json({err:"mauvais format Email"}) : res.status(400).json({err:"les rôle disponible sont touriste ou hote"});
      }
   } 
   catch(err){
       console.log(err.message)
   }
}
//////// login Tourist ////////
exports.login = (req, res, next) => {
    const {email, password} = req.body;
    const role = req.params.role;

    model.login (email,role, async (err, resp) => {

        if(err){
            res.status(500).json({message:"connection to database failed"});
            return;
        }

        else{
            if( resp.length > 0 ){

                const checkPassword = await bcrypt.compare(password, resp[0].password);
                console.log('check '+checkPassword)
                if(checkPassword){
                    next();

                }
                else{
                    res.status(404).json({message:"invalid password"});

                }
                return;
            }
            res.status(404).json({message:"user doesn't exist"});
        }
    })
}


exports.authentication = (req,res) =>{
    const {email} = req.body;
    const expDate = Date.now() + 3600000;
    const role = req.params.role;
    
    model.getUser(email,role, async (err,response)=>{
        if(err){
            res.status(500).json({message : err});
        }
    
        const user = {
            email : email,
            role : role,
            first_name : response[0].first_name,
            id : response[0].id
        }
        const token = await jwt.sign(user, process.env.SECRET);
        
        // console.log(res.cookies.authentication)
        res.status(200).json({message : `bienvenu ${user.first_name} en tant que ${user.role}`,token : token});
    })
}

/////////////////////////////////////////////////// HOST ////////////////////////////////////////////////////////////

// Add a place
exports.add_a_place = (req, res) => {
    
    const {name, description, rooms, bathrooms, max_guests, price_by_night_, available} = req.body;
    const {user_id, city_name} = req.params;

    model.get_a_city(city_name, (err, resp)=> {
        if(err) {
            res.status(500).json({message: err})
        }
        if(resp.length > 0){
            const city_id = resp[0].id;

            model.add_a_place(city_id,req.body, user_id,  (err, response)=>{

                if(err) {
                    res.status(500).json({messsage: err});
                }
                res.status(200).json({message: "successfully added a place!"});
            })
            return;
        }
        res.status(400).json({message: "city not found!"})
    })
}

// Delete a place
exports.delete_a_place = (req, res)=>{
    const {place_id, user_id} = req.params;

    model.delete_a_place(place_id, user_id, (err, response)=>{
        if(err){
            res.status(500).json({message: err});
        }

        res.status(200).json({message: "sucessfully deleted a place!"});
    })
}

//Get host's places list
exports.get_host_places_list = (req, res)=>{
    const {user_id} = req.params;

    model.get_places_in_rent_list(user_id, (err, response)=>{
        if(err){
            res.status(500).json({message: "connection failed!"})
            return;
        }
        console.log(response[0])

        if(response.length > 0){

            res.status(200).json({message: "success!", response: response});
            return;
        }
        res.status(400).json({message: "not found!"})
    })
}

// Host can change a place's info
exports.modify_place_info = (req, res)=>{
    const {column, place_id} = req.params;
    const {newValue} = req.body;

    model.editInfo(column, newValue, place_id, (err, response)=>{
        if(err){
            res.status(500).json({message: err})
            return;
        }
        res.status(200).json({message: response})
    })
}

// All places booked
exports.all_booked_places = (req, res)=>{
    const{user_id} = req.params;

    model.all_booked_places(user_id, (err, response)=>{

        if(err){
            res.status(500).json({message: "connection failed!"})
        }
        if(response.length === 0){
            res.status(400).json({message: "no places booked"})
        }
        res.status(200).json({message: "success!", response: response})
    })
}

// 

