const User = require('../models/User.js');
const auth = require('../auth.js');
const bcrypt = require('bcrypt');




// Register user
module.exports.registerUser = (req, res) => {

	const { email, password } = req.body;

	if (!email || !email.includes('@')){
		return res.status(400).send({
			message: 'Invalid email format'
		})
	}

	return User.findOne({ email: email})
	.then((existing) => {
		if (existing){
			return res.status(409).send({
				message: 'Email already registered'
			})
		} else {

			const newUser = new User({
				email: email,
				password: bcrypt.hashSync(password, 10)
			})

			return newUser.save()
			.then((result) => {
				if (!result){
					return res.status(400).send({
						message: 'Failed to register'
					})
				} else {
					return res.status(200).send({
						message: 'Registered successfully'
					})
				}
			})
			.catch((err) => {
				return res.status(500).send({
					message: 'Internal Server Error'
				})
			})

		}
	})

}







// Login user
module.exports.loginUser = (req, res) => {

	const { email, password } = req.body;

	return User.findOne({ email: email})
	.then((result) => {
		if (!result){
			return res.status(404).send({
				message: 'No email found'
			})
		} else {

			const isPasswordCorrect = bcrypt.compareSync(password, result.password);

			if (!isPasswordCorrect){
				return res.status(401).send({
					message: 'Invalid email and password'
				})
			} else {

				return res.status(200).send({
					access: auth.createAccessToken(result)
				})

			}

		}
	})
	.catch((err) => {
		return res.status(500).send({
			message: 'Internal Server Error'
		})
	})

}






// Get user details
module.exports.userDetails = (req, res) => {

	const userId = req.user.id;

	return User.findById(userId)
	.select('-password')
	.then((result) => {
		if (!result){
			return res.status(404).send({
				message: 'No user found'
			})
		} else {

			return res.status(200).send({
				user: result
			});

		}
	})
	.catch((err) => {
		return res.status(500).send({
			message: 'Internal Server Error'
		})
	})

}