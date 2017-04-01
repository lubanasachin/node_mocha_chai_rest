'use strict';

var server = require('./server'),
	router = require('./router'),
	myroutes = require('./app/routes/index');

server.start(router.route);
