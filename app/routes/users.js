'use strict';

var routes = require('../../routes'),
	users = require('../users'),
	response = require('mj-response'),
	common = require('mj-common'),
	auth = require('mj-auth');

/**
 * get all user detail from users collection
*/
routes.get('/users/all',function(req,res) {
	common.log("info:: get all user details called");
	users.getAllUsers().then(function(data) { 
		common.log("succ:: get all users details success!"); 
		var respCode = "S206";
		if(data.length > 0) {
			data = common.decryptPassword(data);
			respCode = "S207";
		}
		response.send(res,{type: "success",code: respCode, respData: data});
	}).then(undefined,function(eCode) { 
		common.log("err:: get all user details failed with errorCode: "+eCode); 
		response.send(res,{type:"error", code: eCode});
	});
});

/**
 * add new user detail into users collection
*/
routes.post('/users',function(req,res) {
	common.log("info:: add new user called");
	var jsonData = {};
	common.isValidJson(req.body).then(function(reqData) {
		jsonData = reqData; 
		jsonData.password = common.encrypt(jsonData.password);
		return users.addNewUser(jsonData);
	}).then(function() {
		common.log("succ:: add new user details success!"); 
		response.send(res,{type: "success",code: "S208"});
	}).then(undefined,function(eCode) {
		common.log("err:: add new user details failed with errorCode: "+eCode); 
		response.send(res,{type:"error", code: eCode});
	});
});

/**
 * authenticate user detail from users collection
*/
routes.post('/users/auth',function(req,res) {
    common.log("info:: auth user called");
    var jsonData = {};
    common.isValidJson(req.body).then(function(reqData) {
        jsonData = reqData;
        return users.authenticateUser(jsonData);
    }).then(function() {
		return auth.generateToken(jsonData);
    }).then(function(token) {
        common.log("succ:: auth user details success!");
        response.send(res,{type: "success",code: "S209", token: token});
    }).then(undefined,function(eCode) {
        common.log("err:: auth user details failed with errorCode: "+eCode);
        response.send(res,{type:"error", code: eCode});
    });
});

/**
 * remove all user detail from users collection
*/
routes.delete('/users',function(req,res) {
    common.log("info:: delete all user details called");
    users.removeAllUsers().then(function(data) {
        common.log("succ:: delete all users details success!");
        response.send(res,{type: "success",code: "S210", respData: data});
    }).then(undefined,function(eCode) {
        common.log("err:: delete all user details failed with errorCode: "+eCode);
        response.send(res,{type:"error", code: eCode});
    });
});
