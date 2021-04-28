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