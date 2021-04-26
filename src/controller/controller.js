const model = require ('../model/model');
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const { response } = require('express');





 //////////// signup///////
exports.signUp = async(req, res) => {
    
    const{email, password, first_name, last_Name, role} = req.body;
   try {
      const regEmail = /^w+@.\.[a-z]{2,}/;
      const regRole = /^(hote|touriste)$ /i;
      if(reg.test(email) && regRole.test(role) ){
          
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
                    res.status(500).json({message:"connection to database failed"});
                    return;
                }
                res.status(200).json({message:"user registered"});
            })
      }
      else{ 
          res.status(400).json({message:"bad entries"});
      }
   } 
   catch(err){
       console.log(err.message)
   }
}
//////// login Tourist ////////
exports.loginTourist = (req, res, next) => {
    const {email, password} = req.body;
    const user = {
                email:email
            }
    model.loginTourist (email, async (err, resp) => {
        if(err){
            res.status(500).json({message:"connection to database failed"});
            return;
        }
        else{
            if( resp.length > 0 ){
                const checkPassword = await bcrypt.compare(password, resp[0].password);
                if(checkPassword){
                    next();
                }
                res.status(404).json({message:"invalid password"});
                return;
            }
            res.status(404).json({message:"user doesn't exist"});
        }
    })
}
/////login host////////
exports.loginHost = (req, res, next) => {
    const {email, password} = req.body;
    const user = {
                email:email
            }
    model.loginHost (email, async (err, resp) => {
        if(err){
            res.status(500).json({message:"connection to database failed"});
            return;
        }
        else{
            if( resp.length > 0 ){
                const checkPassword = await bcrypt.compare(password, resp[0].password);
                if(checkPassword){
                    next();
                }
                res.status(404).json({message:"invalid password"});
                return;
            }
            res.status(404).json({message:"user doesn't exist"});
        }
    })
}