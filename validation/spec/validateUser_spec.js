import validateUser from '../validateUser';
const chai = require('chai');
const should = chai.should();
describe('validate user', () => {
  it('should mark an invalid user as such', () => {
    const validUser = {
      username: '' ,
      password: '',
      name: '',
      firstname: '',
      admin: false
    };
    const result = validateUser(validUser);
    should.exist(result.error);
  });
  it('should mark a valid user as such', () => {
    const validUser = {
      username: 'foobar@foo.be' ,
      password: 'blablabla',
      confirmPassword: 'blablabla',
      name: 'foo',
      firstname: 'bar',
      admin: false
    };
    const result = validateUser(validUser);
    should.not.exist(result.error);
  });
});
