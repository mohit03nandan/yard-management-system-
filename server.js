const express = require('express')
const bodyParser = require('body-parser');
const vehicleRoutes = require('./routes/vehicleRoutes');
const path = require('path');
const cors = require('cors');
const connect = require("./config/db")
const app = express();

connect();


app.use(bodyParser.json());
app.use(cors());
app.use('/qr-codes', express.static(path.join(__dirname, '../qr-codes')));
app.use('/vehicles', vehicleRoutes);

//routes

app.get("/api/health" ,(req,res) =>{
    res.send(`backend server is active status: active & time:${ new Date()}`)
})


// error handling
app.use(function (req, res, next) {
    res.status(404).send("Something went wrong! Please try after some time.");
  })


//connection part
const port = process.env.PORT || 3001;
const host = process.env.HOST || "localhost"
app.listen(port, () => {
    console.log(`Express server listening at http://${host}:${port}`)
})
