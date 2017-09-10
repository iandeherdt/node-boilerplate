
import request from 'superagent';
const loginRoute = '/auth/login';
const resetPasswordRoute = '/auth/password/reset';
const forgotPasswordRoute = '/auth/password/forgot';
const activateAccountRoute = '/auth/account/activate';
const userRoute = '/user';

function createBearer() {
  return 'Bearer ' + sessionStorage.getItem('token');
}

module.exports = {
  login(username, password, callback){
    request.post(loginRoute)
      .send({username: username, password: password})
      .end(callback);
  },
  getUser(callback){
    request.get(userRoute)
      .set('Authorization', createBearer())
      .end(callback);
  },
  registerSocial(user, callback){
    const url = `${userRoute}/${user.id}`;
    request.put(url)
      .set('Authorization', createBearer())
      .send(user)
      .end(callback);
  },
  register(user, callback){
    request.post(userRoute)
      .set('Authorization', createBearer())
      .send(user)
      .end(callback);
  },
  resetPassword(password, confirmpassword, token, callback){
    const url = `${resetPasswordRoute}?token=${token}`;
    request.put(url)
      .set('Authorization', createBearer())
      .send({password, confirmpassword})
      .end(callback);
  },
  forgotPassword(email, callback){
    request.post(forgotPasswordRoute)
      .set('Authorization', createBearer())
      .send({email})
      .end(callback);
  },
  activateAccount(token, callback){
    const url = `${activateAccountRoute}?token=${token}`;
    request.put(url)
      .end(callback);
  }
};