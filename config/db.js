require('dotenv').config();
const mongoose=require('mongoose');

function connectDB(){
    //database connection
    mongoose.connect(process.env.MONGO_CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
    const connection=mongoose.connection;

    //For Successfull Connection
    connection.once('open',function(){
        console.log("Databsse Succesfully Connection!");
    }).catch(err=>{
        console.log('Connection failed');
    })
}

module.exports=connectDB;