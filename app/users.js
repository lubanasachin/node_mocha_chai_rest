'use strict';

var Promise = require('promise'),
	users = require("mj-users"),
	common = require("mj-common");

/**
 * check if username and password is valid and exists in users collection
 * @params json: userData
 * @returns promise
*/
function authenticateUser(userData) {
    return new Promise(function (resolve,reject) {
        if(userData.username === "" || userData.password === "") return reject("E514");
		var password = common.encrypt(userData.password);
        users.findOne({username: userData.username, password: password},function(err,data) {
            if(err) return reject("E504");
            if(data.length <= 0) return reject("E515");
            return resolve();
        });
    });
}

/**
 * get all user details from users collection
 * @params
 * @returns promise
*/
function getAllUsers() {
	return new Promise(function (resolve,reject) {
		users.findAll(function(err,data) {
			if(err) return reject("E512");
			return resolve(data);	
		});
	});
}

/**
 * add new user details into users collection
 * @params json: userData
 * @returns promise
*/
function addNewUser(userData) {
	return new Promise(function (resolve,reject) {
        if(userData.username === "" || userData.password === "") return reject("E514");
		users.save(userData,function(err,data) {
			if(err) return reject("E513");
			return resolve(data);	
		});
	});
}

/**
 * remove all user details from users collection
 * @params
 * @returns promise
*/
function removeAllUsers() {
	return new Promise(function (resolve,reject) {
		users.remove(function(err,data) {
			if(err) return reject("E504");
			return resolve(data);	
		});
	});
}

module.exports = {
	getAllUsers: getAllUsers,
	addNewUser: addNewUser,
	authenticateUser: authenticateUser,
	removeAllUsers: removeAllUsers
}
