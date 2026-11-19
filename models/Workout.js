const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'name is required']
	},
	duration: {
		type: String,
		require: [true, 'duration is required']
	},
	userId: {
		type: String,
		required: [true, 'userId is required']
	},
	status: {
		type: String,
		enum: ['pending', 'completed'],
		default: 'pending'
	},
	dateAdded: {
		type: Date,
		default: Date.now
	}
});


module.exports = mongoose.model('Workout', workoutSchema);