// Main starting point of application
const express = require('express'),
			http = require('http'),
			bodyParser = require('body-parser'),
			morgan = require('morgan'),
			app = express(),
			router = require('./router'),
			mongoose = require('mongoose');

//DB connect
mongoose.connect('mongodb://localhost:auth/auth')

// App Setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*'}));
router(app);
//Server setup

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on ', port);