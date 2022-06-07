// required libs : mongoose | colors
// run the following command
// npm i mongoose colors

require('dotenv').config();
const colors = require('colors');
const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://woodsala:woodsala2022@woodsala.unthc.mongodb.net/woodSala?retryWrites=true&w=majority" , { useNewUrlParser : true, useUnifiedTopology : true})
.then((res)=>console.log('> Connected...'.bgCyan))
.catch(err=>console.log(`> Error while connecting to mongoDB : ${err.message}`.underline.red ))