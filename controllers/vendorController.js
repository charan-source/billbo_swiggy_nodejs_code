
const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const dotEnv = require('dotenv')

dotEnv.config();

const Secretkey = process.env.WhatIsYourName;


   const VendorRegister = async (req, res) =>{
         const {username, email, password} = req.body;

         try{
            const VendorEmail = await Vendor.findOne({email});
            if(VendorEmail){
                return res.status(400).json("email already taken");
            };

            const HassedPassword = await bcrypt.hash(password, 10);

            const newVendor = new Vendor({
                username,
                email,
                password: HassedPassword,
            });

            await newVendor.save();

            res.status(201).json({message:"Vendor Register Success fully"});
            console.log("Registerd")

         }
         catch (error) {
            console.error(error);
             res.status(500).json({error : "internal server error"})
         }
   }

   const vendorLogin = async (req, res) => {
        const {email, password} = req.body

        try{
              const vendor = await Vendor.findOne({email});
              if( !vendor || !(await bcrypt.compare(password, vendor.password))){

                 return res.status(401).json({error: "please check your username and password"})
              }

              const token = jwt.sign({ vendorId : vendor._id }, Secretkey , {expiresIn:"1h"})

              res.status(201).json({success: "Login Successfull", token});

              console.log(email, "this id your token", token);
        }
        catch(error){
             console.log(error);
             res.status(500).json({error: "internal server error"})
        }
   }


   const getAllVendors = async(req, res) => {
        try{
         const vendors = await Vendor.find().populate('firm');
          res.json({vendors});
        }
        catch(error){
            console.log(error);
            res.status(500).json({error: "internal server error"})

        }
   }

   const getVendorById = async(req, res) => {
         const vendorId = req.params.apple;

         try{

            const vendor = await Vendor.findById(vendorId).populate('firm');
            if (!vendor) {
                return res.status(404).json({error: "vendor not found"})
            }
            res.status(200).json({vendor});
         }
         catch (error){
            console.log(error);
            res.status(500).json({error: "internal server error"});
         }
     
   }



//    const getVendorById = async(req, res) => {
//     const vendorId = req.params.apple;

//     try {
//         const vendor = await Vendor.findById(vendorId).populate('firm');
//         if (!vendor) {
//             return res.status(404).json({ error: "Vendor not found" })
//         }
//         // const vendorFirmId = vendor.firm[0]._id;
//         res.status(200).json({ vendor })
//         // console.log(vendorFirmId);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// }




   module.exports = { VendorRegister , vendorLogin, getAllVendors, getVendorById}