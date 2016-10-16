const passport = require('passport'),
			User = require('../models/user'),
			config = require('../config'),
			JwtStrategy = require('passport-jwt').Strategy,
			ExtractJwt = require('passport-jwt').ExtractJwt,
			localStrategy = require('passport-local');

//create local strategy
const localOptions = { usernameField: 'email'};
const localLogin = new localStrategy(localOptions, function(email, password, done) {
	//verify user and password, call done with the user 
	//if it is the correct user
	//otherwise call done when false
	User.findOne({ email: email }, function (err, user){
		if (err) { return done(err)}
		if (!user) { return done(null, false); }
	//compare passwords
	console.log(user)
		user.comparePassword(password, function (err, isMatch) {
			if (err) { return done(err); }
			if(!isMatch) { return done(null, false); }
			return done(null, user);
		})
	})
});

//set up options fot JWT Strategy
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
};

//create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
//see if the user ID in payload exists in database
//if it does call done with that user
//otherwise call done without a user opbject
	User.findById(payload.sub, function(err, user){
		if (err) {
			return done(err, false);
		} if (user){
			return done(null, user);
		} else {
			done(null, false);
		}
	});
});
//tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);