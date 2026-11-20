const Workout = require('../models/Workout.js');



// Add workout
module.exports.addWorkout = (req, res) => {

	const id = req.user.id;
	const { name, duration, } = req.body;

	const newWorkout = new Workout({
		name: name,
		duration: duration,
		userId: id
	})

	return newWorkout.save()
	.then((result) => {
		if (!result){
			return res.status(400).send({
				message: 'Failed to create workout'
			})
		} else {

			return res.status(200).send(result);

		}
	})
	.catch((err) => {
		return res.status(500).send({
			message: 'Internal Server Error'
		})
	})

}






// Get workouts by specific user
module.exports.getMyWorkouts = (req, res) => {

	return Workout.find({ userId: req.user.id})
	.then((result) => {
		if (!result){
			return res.status(404).send({
				message: 'user does not exist'
			})
		} else {

			return res.status(200).send(result);

		}
	})
	.catch((err) => {
		return res.status(500).send({
			message: 'Internal Server Error'
		})
	})

}






// Update workout details
module.exports.updateWorkout = (req, res) => {

	const workoutId = req.params.workout_Id;

	const { name, duration } = req.body;

	const newDetails = {
		name: name,
		duration: duration
	}

	return Workout.findByIdAndUpdate(workoutId, newDetails, { returnDocument: 'after' })
	.then((result) => {
		if (!result){
			return res.status(400).send({
				message: 'Failed to update workout details'
			})
		} else {

			return res.status(200).send({
				message: 'Workout updated successfully',
				updatedWorkout: result
			})

		}
	})
	.catch((err) => {
		return res.status(500).send({
			message: 'Internal Server Error'
		})
	})

}





// Delete workout 
module.exports.deleteWorkout = (req, res) => {

	const workoutId = req.params.workout_Id;

	return Workout.findByIdAndDelete(workoutId)
	.then((result) => {
		if (!result){
			return res.status(400).send({
				message: 'Failed to delete workout'
			})
		} else {

			return res.status(200).send({
				message: 'Workout deleted successfully'
			})

		}
	})
	.catch((err) => {
		return res.status(500).send({
			message: 'Internal Server Error'
		})
	})

}







// Complete workout status
module.exports.completeWorkoutStatus = (req, res) => {

	const workoutId = req.params.workout_Id;

	const newStatus = {
		status: "completed"
	}

	return Workout.findByIdAndUpdate(workoutId, newStatus, { new:true })
	.then((result) => {
		if (!result){
			return res.then(400).send({
				message: 'Failed to updated status'
			})
		} else {

			return res.status(200).send({
				message: 'Workout status udpated successfully',
				updatedWorkout: result
			})

		}
	})
	.catch((err) => {
		return res.status(500).send({
			message: 'Internal Server Error'
		})
	})

}







// Get specific workout
module.exports.getWorkouts = (req, res) => {

	const workoutId = req.params.workout_Id;

	return Workout.findById(workoutId)
	.then((result) => {
		if (!result){
			return res.status(400).send({
				message: 'Workout does not exist'
			})
		} else {
			return res.status(200).send(result)
		}
	})
	.catch((err) => {
		return res.status(500).send({
			error: 'Internal Server Error'
		})
	})

}