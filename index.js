const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userROutes.js');
const workoutRoutes = require('./routes/workoutRoutes.js');


const PORT = 4000;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended:true }));


mongoose.connect("mongodb+srv://admin:admin1234@b645-butanas.kz5ezgh.mongodb.net/FitnessTracker?appName=B645-Butanas");

let db = mongoose.connection;

db.on("err", () => console.error('Failed to established connection from database'));
db.once("open", () => console.log('Successfully connected to atlasDB'));







// Routes
app.use("/users", userRoutes);
app.use("/workouts", workoutRoutes);







if(require.main === module){
	app.listen(PORT, () => {
	    console.log(`Server is online in port: ${PORT}`);
	});
}


module.exports = {app,mongoose};