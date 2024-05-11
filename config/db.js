const mongoose = require('mongoose');
const URL = process.env.DB_URL;

const connection = async() => {
    await mongoose.connect(URL)
    .then(() => {
        console.log("Connected to db");
    })
    .catch(() => {
        console.log("Not connected to db");
    })
}

module.exports = connection;