process.env.NODE_ENV = 'test';
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const passportStub = require('passport-stub');
const jwt = require('jsonwebtoken');
const config = require('../../server/config/config');
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
  describe('POST /user', () => {
    it('should register a new user', (done) => {
      chai.request(server)
        .post('/user')
        .send({
          username: 'michael@telenet.be',
          password: 'herman',
          name: 'tysmans',
          firstname:'mike',
          confirmPassword: 'herman',
          admin: false,
          street: 'street one',
          house: '5',
          bus: '',
          postal: '2345',
          city: 'Beringen',
          country: 'Belgium',
        })
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          const decoded = jwt.verify(res.body.token, config.jwtSecret);
          decoded.username.should.eql('michael@telenet.be');
          decoded.id.should.eql(4);
          decoded.name.should.eql('tysmans');

          const user = res.body.user;
          user.username.should.eql('michael@telenet.be');
          user.id.should.eql(4);
          done();
        });
    });
  });
  describe('POST /user', () => {
    it('should register a new user', (done) => {
      chai.request(server)
        .post('/user')
        .send({
          username: 'michael@telenet.be',
          password: 'herman',
          name: 'tysmans',
          firstname:'mike',
          confirmPassword: 'herman',
          admin: false,
          street: 'street one',
          house: '5',
          bus: '',
          postal: '2345',
          city: 'Beringen',
          country: 'Belgium',
        })
        .end(() => {
          chai.request(server)
            .post('/user')
            .send({
              username: 'michael@telenet.be',
              password: 'herman',
              name: 'tysmans',
              firstname:'mike',
              confirmPassword: 'herman',
              admin: false,
              street: 'street one',
              house: '5',
              bus: '',
              postal: '2345',
              city: 'Beringen',
              country: 'Belgium',
            }).end((err, res) => {
              should.exist(err);
              res.redirects.length.should.eql(0);
              res.status.should.eql(400);
              res.type.should.eql('application/json');
              done();
            });
        });
    });
  });
  describe('PUT /user', () => {
    it('should update a new user', (done) => {
      const token = jwt.sign({id: '1', username: 'jeremy', name: 'jerry', email:'jerry@hotmail.com' }, config.jwtSecret);
      chai.request(server)
        .put('/user/3')
        .set('Authorization', 'Bearer ' + token)
        .send({
          firstname: 'Ian',
          name: 'De Herdt',
          email: 'iandeherdt@foo.com'
        })
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          chai.request(server)
            .get('/user/3')
            .set('Authorization', 'Bearer ' + token)
            .end((errget, resget) => {
              should.not.exist(errget);
              resget.redirects.length.should.eql(0);
              resget.status.should.eql(200);
              resget.type.should.eql('application/json');
              const user = resget.body;
              user.id.should.eql(3);
              user.name.should.eql('De Herdt');
              user.firstname.should.eql('Ian');
              user.email.should.eql('iandeherdt@foo.com');
              done();
            });
        });
    });
  });
});