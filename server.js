'use strict';

var http = require("http"),
	url = require("url"),
	querystring = require('querystring');

/**
 * start routing requests that are received
 * @params function: route
 * @returns
*/
function start(route) {

	function onRequest(req, res) {

		var reqdet = url.parse(req.url,true);
		var key = req.method + ':' + reqdet.pathname;
		//console.log("info:: request for " + key + " received.");

		if(req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
			var queryData = "";
			req.on('data', function(data) {
				queryData += data;
				if(queryData.length > 1e6) {
					queryData = "";
					res.writeHead(413, {'Content-Type': 'text/plain'}).end();
					req.connection.destroy();
				}
			});
			req.on('end', function() {
				req.body = queryData;
				route(key,req,res);
			});
		} else if(req.method === 'GET') {
			if(reqdet.query != undefined) req.query = reqdet.query;
			route(key,req,res);
		}

	}

	http.createServer(onRequest).listen(9000);

}

//console.log("info:: server has started listening on port 9000");

exports.start = start;
