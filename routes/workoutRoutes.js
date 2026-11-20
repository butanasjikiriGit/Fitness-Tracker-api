const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController.js');
const { verify } = require('../auth.js');


router.post('/addWorkout', verify, workoutController.addWorkout);

router.get('/getMyWorkouts', verify, workoutController.getMyWorkouts);

router.patch('/updateWorkout/:workout_Id', verify, workoutController.updateWorkout);

router.delete('/deleteWorkout/:workout_Id', verify, workoutController.deleteWorkout);

router.patch('/completeWorkoutStatus/:workout_Id', verify, workoutController.completeWorkoutStatus);

router.get('/getWorkouts/:workout_Id', verify, workoutController.getWorkouts);








module.exports = router;