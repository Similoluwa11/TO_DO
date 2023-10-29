const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()


const connect = async (url) => {
    mongoose.connect(process.env.MONGODB_URL ||'mongodb+srv://akhigbesimiloluwa:SIMILOLUWA2543@cluster0.vno7quh.mongodb.net/')

    mongoose.connection.on("connected", () => {
        console.log("Connected to MongoDB Successfully");
    });

    mongoose.connection.on("error", (err) => {
        console.log("An error occurred while connecting to MongoDB");
        console.log(err);
    });
}

module.exports = {
    connect
};