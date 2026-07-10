const mongoose = require("mongoose");

const connectDB = async ()=> {
    try  {
        console.log("Connecting to mongoDB...");

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Conneceted Successfully");
        console.log("Database  :",mongoose.connection.name);
        console.log("Host   :",mongoose.connection.host);
    
    }
    catch(error){
        console.log("MongoDB Connection failed");
        console.log(error.message);
    }
}
module.exports = { connectDB };
