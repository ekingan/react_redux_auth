const mongoose = require('mongoose'),
			Schema = mongoose.Schema,
			bcrypt = require('bcrypt-nodejs');


//Define our model
const userSchema = new Schema({
	email: { type: String, unique: true, lowercase: true },
	password: String
});

//On save hook, encrypt password
//Before saving the model, run this function
userSchema.pre('save', function(next) {
	//get access to the user model
	const user = this;
	//generate a salt then run callback
	bcrypt.genSalt(10, function(err, salt) {
		if (err) { return next(err); }
		//hash password using the salt
		bcrypt.hash(user.password, salt, null, function (err, hash) {
			if (err) { return next(err); } 
			//overwrite plain text password with encripted password
		user.password = hash;
		next();
		});
	});
});

userSchema.method.comparePasswords = function (canidatePassword, callback){
	bcrypt.compare(canidatePassword, this.password, function (err, isMatch) {
		if (err) {
		 return callback(err); 
		 }

		callback(null, isMatch);

	});
};

//Create Model Class
const ModelClass = mongoose.model('user', userSchema);

//export modeal
module.exports = ModelClass;