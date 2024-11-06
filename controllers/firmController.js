
const Firm = require('../models/Firm');

const Vendor = require('../models/Vendor');

const multer = require('multer');

const path = require('path')



const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Specify the directory for uploaded files
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with current timestamp
    }
});

 const upload = multer({ storage: storage});
   
 const addFirm = async(req, res) =>{

   try{
    const {firmName, area, category, region, offer } = req.body;

    const image = req.file? req.file.filename: undefined;
    
   const vendor = await Vendor.findById(req.vendorId)
   if(!vendor){
      res.status(404).json({error:"vendor not found"})
   }

   const firm =  new Firm({
      firmName, area, category, region, offer, image , vendor:vendor._id
   });

     const savedfirm = await firm.save();

     vendor.firm.push(savedfirm);

     vendor.save();


    return res.status(200).json({messege: "Firm Added Successfully"})

   }
   catch(error){
     console.error(error);
     res.status(500).json({error: "internal server problem"})
   }


 }



 const deleteFirmById = async(req, res) => {
  try {
      const firmId = req.params.firmId;

      const deletedProduct = await Firm.findByIdAndDelete(firmId);

      if (!deletedProduct) {
          return res.status(404).json({ error: "No product found" })
      }
      res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" })
  }
}

 module.exports = {addFirm: [upload.single('image'), addFirm], deleteFirmById}