'use strict';

var routes = require('../../routes'),
	customers = require('../customers'),
	response = require('mj-response'),
	auth = require('mj-auth'),
	common = require('mj-common');

/**
 * get a customer detail from customer collection for given customer_id
*/
routes.get('/customers',function(req,res) {
	common.log("info:: get customer details called");
	auth.verifyToken(req.headers['x-access-token'] || "").then(function() {
		common.log("succ:: get customer details token verified!"); 
		return customers.getCustomerDetails(req.query.customer_id || "");
	}).then(function(data) { 
		common.log("succ:: get customer details success!"); 
		var respCode = "S205";
		if(data.length > 0) respCode = "S202";
		response.send(res,{type: "success",code: respCode, respData: data});
	}).then(undefined,function(eCode) {
		common.log("err:: get customer details failed with errorCode: "+eCode); 
		response.send(res,{type:"error", code: eCode});
	});
});

/**
 * get all customer detail from customers collection
*/
routes.get('/customers/all',function(req,res) {
	common.log("info:: get all customer details called");
	auth.verifyToken(req.headers['x-access-token'] || "").then(function() {
		common.log("succ:: get all customer details token verified!"); 
		return customers.getAllCustomers();
	}).then(function(data) { 
		common.log("succ:: get all customer details success!"); 
		var respCode = "S205";
		if(data.length > 0) respCode = "S202";
		response.send(res,{type: "success",code: respCode, respData: data});
	}).then(undefined,function(eCode) { 
		common.log("err:: get all customer details failed with errorCode: "+eCode); 
		response.send(res,{type:"error", code: eCode});
	});
});

/**
 * add new customer detail into customers collection
*/
routes.post('/customers',function(req,res) {
	common.log("info:: add new customer called");

	var jsonData = {};
	auth.verifyToken(req.headers['x-access-token'] || "").then(function() {
		common.log("succ:: add customer details token verified!"); 
		return common.isValidJson(req.body);
	}).then(function(reqData) {
		jsonData = reqData; 
		return customers.isValidCustomerId(jsonData.customer_id || "");
	}).then(function() {
		return common.isValidEmailAddress(jsonData.email || "");
	}).then(function() {
		return common.isValidMobileNumber(jsonData.mobile || "");
	}).then(function() {
		jsonData.mobile = common.encrypt(jsonData.mobile);
		return customers.addNewCustomer(jsonData);
	}).then(function() {
		common.log("succ:: add new customer details success!"); 
		response.send(res,{type: "success",code: "S201"});
	}).then(undefined,function(eCode) {
		common.log("err:: add new customer details failed with errorCode: "+eCode); 
		response.send(res,{type:"error", code: eCode});
	});
});

/**
 * update customer detail into customers collection for given customer_id
*/
routes.put('/customers',function(req,res) {
    common.log("info:: update customer called");
    var jsonData = {};
	auth.verifyToken(req.headers['x-access-token'] || "").then(function() {
		common.log("succ:: add customer details token verified!"); 
		return common.isValidJson(req.body);
	}).then(function(reqData) {
        jsonData = reqData;
        return common.isValidEmailAddress(jsonData.email || "");
    }).then(function() {
        return common.isValidMobileNumber(jsonData.mobile || "");
    }).then(function() {
		jsonData.mobile = common.encrypt(jsonData.mobile);
        return customers.updateCustomer(jsonData);
    }).then(function() {
        common.log("succ:: update customer details success!");
        response.send(res,{type: "success",code: "S203"});
    }).then(undefined,function(eCode) {
        common.log("err:: update customer details failed with errorCode: "+eCode);
        response.send(res,{type:"error", code: eCode});
    });
});
