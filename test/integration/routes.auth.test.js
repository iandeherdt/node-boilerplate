process.env.NODE_ENV = 'test';
const jwt = require('jsonwebtoken');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const config = require('../../server/config/config');
const passportStub = require('passport-stub');
chai.use(chaiHttp);

const server = require('../../index');
const knex = require('../../server/db/connection');

passportStub.install(server);

describe('routes : auth', () => {
  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); });
  });

  afterEach(() => {
    passportStub.logout();
    return knex.migrate.rollback();
  });
  describe('POST /auth/login', () => {
    it('should login a user', (done) => {
      chai.request(server)
        .post('/auth/login')
        .send({
          username: 'jeremy',
          password: 'johnson123',
        })
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          const decoded = jwt.verify(res.body.token, config.jwtSecret);
          decoded.username.should.eql('jeremy');
          decoded.id.should.eql(1);
          decoded.name.should.eql('jerry');

          const user = res.body.user;
          user.username.should.eql('jeremy');
          user.id.should.eql(1);
          user.name.should.eql('jerry');
          done();
        });
    });
    it('should not login an unregistered user', (done) => {
      chai.request(server)
        .post('/auth/login')
        .send({
          username: 'michael',
          password: 'johnson123'
        })
        .end((err, res) => {
          should.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(404);
          res.type.should.eql('application/json');
          res.body.statusCode.should.eql(404);
          res.body.error.should.eql('Not Found');
          res.body.message.should.eql('User not found');
          done();
        });
    });
    it('should handle 2 consecutive logins', (done) => {
      chai.request(server)
        .post('/auth/login')
        .send({
          username: 'jeremy',
          password: 'johnson123',
        })
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          chai.request(server)
            .post('/auth/login')
            .send({
              username: 'jeremy',
              password: 'johnson123',
            })
            .end((err2, res2) => {
              should.not.exist(err2);
              res2.redirects.length.should.eql(0);
              res2.status.should.eql(200);
              done();
            });
        });
    });
  });
  describe('GET /auth/logout', () => {
    it('should logout a user', (done) => {
      passportStub.login({
        username: 'jeremy',
        password: 'johnson123'
      });
      const token = jwt.sign({id: '1', username: 'jeremy', name: 'jerry', email:'jerry@hotmail.com' }, config.jwtSecret);
      chai.request(server)
        .get('/auth/logout')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.status.should.eql('success');
          done();
        });
    });
    it('should throw an error if a user is not logged in', (done) => {
      chai.request(server)
        .get('/auth/logout')
        .end((err, res) => {
          should.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(401);
          res.type.should.eql('application/json');
          res.body.statusCode.should.eql(401);
          res.body.error.should.eql('Unauthorized');
          res.body.message.should.eql('Please log in.');
          done();
        });
    });
  });
  describe('GET /user', () => {
    it('should return a success', (done) => {
      const token = jwt.sign({id: '1', username: 'jeremy', name: 'jerry', email:'jerry@hotmail.com' }, config.jwtSecret);
      chai.request(server)
        .get('/user')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.status.should.eql('success');
          done();
        });
    });
    it('should throw an error if a user is not logged in', (done) => {
      chai.request(server)
        .get('/user')
        .end((err, res) => {
          should.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(401);
          res.type.should.eql('application/json');
          res.body.statusCode.should.eql(401);
          res.body.error.should.eql('Unauthorized');
          res.body.message.should.eql('Please log in.');
          done();
        });
    });
  });
  describe('GET /user/admin', () => {
    it('should return a success', (done) => {
      passportStub.login({
        username: 'kelly',
        password: 'bryant123'
      });
      const token = jwt.sign({id: '1', username: 'kelly', name: 'kelly', email:'kelly@hotmail.com' }, config.jwtSecret);
      chai.request(server)
        .get('/user/admin')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.status.should.eql('success');
          done();
        });
    });
    it('should throw an error if a user is not logged in', (done) => {
      chai.request(server)
        .get('/user')
        .end((err, res) => {
          should.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(401);
          res.type.should.eql('application/json');
          res.body.statusCode.should.eql(401);
          res.body.error.should.eql('Unauthorized');
          res.body.message.should.eql('Please log in.');
          done();
        });
    });
    it('should throw an error if a user is not an admin', (done) => {
      passportStub.login({
        username: 'jeremy',
        password: 'johnson123'
      });
      const token = jwt.sign({id: '1', username: 'jeremy', name: 'jerry', email:'jerry@hotmail.com' }, config.jwtSecret);
      chai.request(server)
        .get('/user/admin')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          should.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(401);
          res.type.should.eql('application/json');
          res.body.statusCode.should.eql(401);
          res.body.error.should.eql('Unauthorized');
          res.body.message.should.eql('You are not authorized.');
          done();
        });
    });
  });
});