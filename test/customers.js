process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var index = require('../index');
var should = chai.should();
var appServer = "http://localhost:9000";
var authToken = "";
var addUserObj = {};
var uniq = "";

chai.use(chaiHttp);

describe('Customers', () => {

    before((done) => { //Before each test we empty the database
		uniq = new Date().getTime().toString();
		uniq = uniq.substr(uniq.length - 4);
		addUserObj = {
			"reqData" : {
				"customer_id": uniq,
				"first_name": "Mart_"+uniq,
				"last_name": "James",
				"ip_address": "192.168.10.1",
				"country": "CC_"+uniq,
				"gender": "male",
				"dob": "16/01/1989",
				"language": ["english", "german", "french"]
			}
		};
		done();
    });

    describe('/DELETE all API users', () => {
        it('it should delete all test API users', (done) => {
            chai.request(appServer)
            .delete('/users')
            .end((err, res) => {
                res.should.have.status(200);
				res.body.should.be.a('object');
                res.body.should.have.property('type').eql('success');
                res.body.should.have.property('code').eql('S210');
                done();
            });
        });
    });

    describe('/POST add new API user', () => {
        it('it should add new test API user', (done) => {
            var reqObj = {"reqData" : {"username": "mjtest","password": "mjtest"}};
            chai.request(appServer)
            .post('/users')
            .send(reqObj)
            .end((err, res) => {
                res.should.have.status(200);
				res.body.should.be.a('object');
                res.body.should.have.property('type').eql('success');
                res.body.should.have.property('code').eql('S208');
                done();
            });
        });
    });

    describe('/POST authenticate test API user', () => {
        it('it should authenticate test API user', (done) => {
            var reqObj = {"reqData" : {"username": "mjtest","password": "mjtest"}};
            chai.request(appServer)
            .post('/users/auth')
            .send(reqObj)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('token');
                res.body.should.have.property('type').eql('success');
                res.body.should.have.property('code').eql('S209');
				authToken = res.body.token;
                done();
            });
        });
    });

    describe('/POST add new customer details', () => {
        it('it should fail to add new MYJAR customer without access token', (done) => {
            chai.request(appServer)
            .post('/customers')
            .send(addUserObj)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.should.have.property('type').eql('error');
                res.body.should.have.property('code').eql('E516');
                done();
            });
        });
    });

    describe('/POST add new customer details', () => {
        it('it should fail to add new MYJAR customer with invalid email address', (done) => {
			addUserObj.reqData.email = "sachin@test@hello.com";
            chai.request(appServer)
            .post('/customers')
            .send(addUserObj)
			.set('X-access-token', authToken)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.should.have.property('type').eql('error');
                res.body.should.have.property('code').eql('E502');
                done();
            });
        });
    });

    describe('/POST add new customer details', () => {
        it('it should fail to add new MYJAR customer with invalid mobile number', (done) => {
			addUserObj.reqData.email = "sachin"+uniq+"@test.com";
            addUserObj.reqData.mobile = "317180773241";
            chai.request(appServer)
            .post('/customers')
            .send(addUserObj)
            .set('X-access-token', authToken)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.should.have.property('type').eql('error');
                res.body.should.have.property('code').eql('E503');
                done();
            });
        });
    });

   describe('/POST add new customer details', () => {
        it('it should add new MYJAR customer', (done) => {
			addUserObj.reqData.email = "sachin"+uniq+"@test.com";
			addUserObj.reqData.mobile = "44718077"+uniq;
            chai.request(appServer)
            .post('/customers')
            .send(addUserObj)
            .set('X-access-token', authToken)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('type').eql('success');
                res.body.should.have.property('code').eql('S201');
                done();
            });
        });
    });

	describe('/GET all customers details', () => {
		it('it should GET all the customers', (done) => {
			chai.request(appServer)
			.get('/customers/all')
			.set('X-access-token', authToken)
            .end((err, res) => {
				res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('type').eql('success');
                res.body.should.have.property('code').to.be.oneOf(['S202','S205']);
				done();
			});
		});
	});

    describe('/GET a customer details', () => {
        it('it should GET a customer detail based on customer_id specified', (done) => {
            chai.request(appServer)
            .get('/customers?customer_id='+uniq)
            .set('X-access-token', authToken)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('type').eql('success');
                res.body.should.have.property('code').to.be.oneOf(['S202','S205']);
                done();
            });
        });
    });

    describe('/PUT modify a customer details', () => {
        it('it should modify a customer detail based on customer_id specified', (done) => {
			addUserObj.reqData.email = "sachin_mod_"+uniq+"@test.com";
            chai.request(appServer)
            .put('/customers')
            .set('X-access-token', authToken)
            .send(addUserObj)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('type').eql('success');
                res.body.should.have.property('code').eql('S203');
                done();
            });
        });
    });

});
