const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECT_URI)
        console.log("Connect to MongoDb successfully");
    }
    catch (error){
        console.log("Connect Failed!"+error.message);
    }
}


module.exports = connectDB