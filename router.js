const Auth = require('./controllers/auth'),
			passportService = require('./services/passport'),
			passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false});
module.exports = function(app) {
	app.get('/', requireAuth, function (req, res) {
		res.send({ hi: 'there' });
	});
	app.post('/signup', requireSignin, Auth.signup);
	app.post('/signin', Auth.signin);
}