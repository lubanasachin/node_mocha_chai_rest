'use strict';

var Promise = require('promise'),
	customers = require("mj-customers"),
	common = require("mj-common");

/**
 * check if customer_id is valid and exists in customers collection
 * @params string: customer_id
 * @returns promise
*/
function isValidCustomerId(customerId) {
	return new Promise(function (resolve,reject) {
		if(customerId === "") return reject("E510");
        customers.findOne({customer_id: customerId.toString()},function(err,data) {
            if(err) return reject("E504");
			if(data.length > 0) return reject("E511");
			return resolve();
        });
    });
}

/**
 * get customer details from customers collection for given customer_id
 * @params string: customer_id
 * @returns promise
*/
function getCustomerDetails(customerId) {
	return new Promise(function (resolve,reject) {
		if(customerId === "") return reject("E510");
		customers.findOne({customer_id: customerId.toString()},function(err,data) {
			if(err) return reject("E506");
			data = common.shortPhoneNumber(data);
			return resolve(data);	
		});
	});
}

/**
 * get all customer details from customers collection
 * @params
 * @returns promise
*/
function getAllCustomers() {
	return new Promise(function (resolve,reject) {
		customers.findAll(function(err,data) {
			if(err) return reject("E505");
			data = common.shortPhoneNumber(data);
			return resolve(data);	
		});
	});
}

/**
 * update customer details in customers collection for given customer_id
 * @params string: customer_id, JSON: customerData
 * @returns promise
*/
function updateCustomer(customerData) {
    return new Promise(function (resolve,reject) {
		if(customerData.customer_id === undefined || customerData.customer_id === "") return reject("E510");
        customers.update({customer_id: customerData.customer_id.toString()},customerData,function(err,data) {
            if(err) return reject("E508");
            return resolve(data);
        });
    });
}

/**
 * add new customer details into customers collection
 * @params json: customerData
 * @returns promise
*/
function addNewCustomer(customerData) {
	return new Promise(function (resolve,reject) {
		customers.save(customerData,function(err,data) {
			if(err) return reject("E507");
			return resolve(data);	
		});
	});
}

module.exports = {
	getCustomerDetails: getCustomerDetails,
	getAllCustomers: getAllCustomers,
	addNewCustomer: addNewCustomer,
	updateCustomer: updateCustomer,
	isValidCustomerId: isValidCustomerId
}
