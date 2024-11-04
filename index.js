const express = require("express");

const app = express();

const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors');


app.use(cors())

const VendorRoutes = require('./routes/vendorRoutes');

const firmRoutes = require('./routes/firmRoutes');

const productRoutes = require('./routes/productRoutes')

const bodyParser = require('body-parser');

const path = require('path');
const PORT = process.env.PORT || 4000;

dotEnv.config();

mongoose.connect(process.env.MONGO_URI)
.then( () =>{
    console.log("server connecting successfull")
})

.catch( (error) =>  {
    console.log(error)
})

app.use(bodyParser.json());
app.use('/vendor', VendorRoutes);
app.use('/firm', firmRoutes);
app.use('/product', productRoutes);
app.use('/uploads', express.static('uploads'));


app.listen(PORT, () => {
    console.log(`Server started and running at ${PORT}`);
});

app.use('/', (req, res) => {
    res.send("<h1>Welcome to Yukthi</h1>");
});
