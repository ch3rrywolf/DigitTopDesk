require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// auth route
const authRoute = require('./routes/authRoute');
app.use('/api', authRoute);

// admin route
const adminRoute = require('./routes/adminRoute');
app.use('/api/admin', adminRoute);

const port = process.env.SERVER_PORT | 3000;

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

connectMongoDB();

app.listen(port, () => {
    console.log("Server is running on port:" +port);
})