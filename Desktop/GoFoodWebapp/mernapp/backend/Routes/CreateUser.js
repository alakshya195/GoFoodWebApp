const express = require('express')
const router = express.Router()
const User = require('../models/User')
const{body,validationResult} = require('express-validator');
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs")
const jwtSecret = "IAMASecretKey"

router.post("/createuser" ,[
body('email' , 'Incorrect Email').isEmail(),
body('name').isLength({min:5}),
body('password' , 'Incorrect Password').isLength({min:5})]
,async (req,res) =>{
    console.log(req.body.name, req.body.password, req.body.email , req.body.location)

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors:errors.array()});
    }
  
    // res.send({ errors: result.array() });

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt)

        try {
            await User.create({
                name:req.body.name,
                password:secPassword,
                email:req.body.email,
                location:req.body.location
            }).then(res.json({success:true}))

        

        } catch (error) {
            console.log(error)
            
            res.json({success:false});
        }
})

router.post("/loginuser" ,[
    body('email' , 'Incorrect Email').isEmail(),
    body('password' , 'Incorrect Password').isLength({min:5})],
    async (req,res) =>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({errors:errors.array()});
        }
        let email= req.body.email;
        try {
            let userData = await User.findOne({email});
            if(!userData){
                return res.status(400).json({errors:"Try logging in with correct credentials"})
            }

            const passCompare = await bcrypt.compare(req.body.password, userData.password)

            if(!passCompare){
                return res.status(400).json({errors:"Try logging in with correct credentials"})
            }

            const data = {
                user:{
                    id:userData.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret)
            return  res.json({success:true , authToken: authToken})
            

        } catch (error) {
            console.log(error)
            
            res.json({success:false});
        }
})



module.exports = router;