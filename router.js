'use strict';

var routes = require('./routes');

/**
 * Route API request to required router
 * @params string: key, request object, response object
 * @returns void
*/
function route(key,req,res) {

	//console.log("info:: handle route for given "+key);

	if (typeof routes[key] === 'function') {

		routes[key](req, res);

    } else {

		console.log("err:: no request handler found for " + key);
		res.writeHead(404, {"Content-Type": "text/plain"});
		res.write("404 Not found");
		res.end();

    }

}

exports.route = route;
