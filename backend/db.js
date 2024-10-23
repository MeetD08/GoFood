const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://Foodie:mern123@cluster0.y1reigo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.set('strictQuery', true); // Or false if you want to prepare for the change
module.exports = function (callback) {
    // Connect to MongoDB using Mongoose
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(async () => {
            console.log("Connected to MongoDB");

            // Accessing the food_items collection
            const foodCollection = await mongoose.connection.db.collection("food_items");

            // Fetching data from food_items
            foodCollection.find({}).toArray(async (err, foodData) => {
                if (err) return callback(err, null);

                // Accessing the food_category collection
                const categoryCollection = await mongoose.connection.db.collection("food_category");

                try {
                    // Fetching data from food_category
                    const Catdata = await categoryCollection.find({}).toArray();
                    callback(null, { foodData, Catdata }); // Passing both collections' data to the callback
                } catch (err) {
                    callback(err, null); // Handle error case
                }
            });
        })
        .catch(err => {
            console.log("Connection Error: ", err);
            callback(err, null); // Return connection error to the callback
        });
};