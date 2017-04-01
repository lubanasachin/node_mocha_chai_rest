'use strict';

/**
 * REST verbs that will be handled by the node application
 * Bind methods for the below configured handlers
 * 
*/
var handle = {

    get: function (route, fn) {
        this['GET:' + route] = fn;
    },
    post: function (route, fn) {
        this['POST:' + route] = fn;
    },
    put: function (route, fn) {
        this['PUT:' + route] = fn;
    },
    delete: function (route, fn) {
        this['DELETE:' + route] = fn;
    }

};

module.exports = handle;
