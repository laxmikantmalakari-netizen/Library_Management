const mongoose=require("mongoose");
const connectDB=async()=>{
    try{
        console.log("connecting to mongodb...");
        await mongoose.connect(ProcessingInstruction.env.MONGO_URI);
        console.log("MongoDB connected successfully");
        console.log("Database :",mongoose.connection.name);
        console.log("Host:",mongoose.connection.host);
    }
    catch(error){
        console.log("")
    }
}