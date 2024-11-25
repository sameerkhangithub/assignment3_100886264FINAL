const mongoose = require('mongoose');

// Function to connect to the MongoDB database
const connectDB = async() => {
    try {
        // MongoDB connection URI (ensure your credentials and cluster details are correct)
        const uri = 'mongodb+srv://sameer7khan6:sameer1423@cluster0.zhiv8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

        // Connect to MongoDB using Mongoose
        await mongoose.connect(uri, {
            useNewUrlParser: true, // Ensures that the new URL parser is used (required for newer versions of MongoDB)
            useUnifiedTopology: true, // Ensures that the new Server Discover and Monitoring engine is used
        });

        console.log('Connected to MongoDB'); // Logs a success message if connected

    } catch (err) {
        // If there is an error during connection, log the error and exit the process
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Exits the application with a failure status
    }
};

// Export the connectDB function so it can be used in other modules
module.exports = connectDB;