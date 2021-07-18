const File=require('./models/file');
const fs = require('fs');
const connectDB=require('./config/db');
connectDB();

async function fetchData(){
    //fetch 24hrs old files and delete them
    //date.now() is in milliseconds
    const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000);  //(hour * min* sec * milliseconds)
    const files= await File.find({
        createdAt:{ $lt : pastDate }        //give us the files if createdAt is less than 24 hrs
    });
    if(files.length){
        for(let file of files){
            try{
                fs.unlinkSync(file.path);   //this will remove the file from uploads folder

                await file.remove();    //this will remove the file from database
                console.log(`Successfully deleted ${file.filename}`);
            }
            catch(err){
                console.log(`Error while deleting file ${err}`);
            }
        }
        console.log('Job Done!');
    }   
}

fetchData().then(process.exit);