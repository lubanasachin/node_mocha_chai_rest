INTRODUCTION
------------

REST API end points developed in Node.js (#NOFRAMEWORKS)

Simple demonstration of designing API endpoints in Node.js

* Promises instead of callbacks
* Json Web Tokens (JWT) to authenticate API end points
* Validator to validate email address and mobile number
* Crypto to encrypt and decrypt data before saving in database
* MongoDb as document data storage
* Test cases using Mocha Chai

REQUIREMENTS
------------

This module requires the following modules:

* Node.js (https://nodejs.org/en/)
* Json Web Tokens (https://www.npmjs.com/package/jsonwebtoken)
* Promise (https://www.npmjs.com/package/promise)
* Crypto (https://www.npmjs.com/package/crypto)
* Validator (https://www.npmjs.com/package/validator)
* Mocha (https://www.npmjs.com/package/mocha)
* Chai (https://www.npmjs.com/package/chai) 

INSTALLATION/ TEST/ EXECUTION
-----------------------------

 * npm install
 * npm test (NODE_ENV= test)
 * npm start (defaults to devel environment)
 * NODE_ENV=prod npm start

CONFIGURATION
-------------

 * Secret code for JWT & Crypto
 * HTTP Server Port
 * Connection string to Mongo Database
 * Debug mode

MAINTAINERS
-----------

Current maintainers:
 * Sachin Lubana 
 * Web: http://meetonsnap.com
 * Blog: http://sachinlubana.wordpress.com
 * Skype: lubanasachin70
 * Twitter: @lubanasachin70
 * Linkedin: https://www.linkedin.com/in/sachinlubana
