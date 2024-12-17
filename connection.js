const mongoose = require('mongoose');

async function connectMongoDb(url) {
    try {
        await mongoose.connect(url);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('Mongo Error:', err);
    }
}

module.exports={
    connectMongoDb,
}