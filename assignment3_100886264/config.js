const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        const uri = 'mongodb+srv://sameer7khan6:sameer1423@cluster0.zhiv8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
};

module.exports = connectDB;