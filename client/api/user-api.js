
const loginRoute = '/auth/login';
const resetPasswordRoute = '/auth/password/reset';
const forgotPasswordRoute = '/auth/password/forgot';
const activateAccountRoute = '/auth/account/activate';
const userRoute = '/user';
import request from 'superagent';

module.exports = {
  login(username, password, callback){
    request.post(loginRoute)
      .send({username: username, password: password})
      .end(callback);
  },
  getUser(callback){
    request.get(userRoute)
      .set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
      .end(callback);
  },
  registerSocial(user, callback){
    const url = `${userRoute}/${user.id}`;
    request.put(url)
      .set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
      .send(user)
      .end(callback);
  },
  register(user, callback){
    request.post(userRoute)
      .set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
      .send(user)
      .end(callback);
  },
  resetPassword(password, confirmpassword, token, callback){
    const url = `${resetPasswordRoute}?token=${token}`;
    request.put(url)
      .set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
      .send({password, confirmpassword})
      .end(callback);
  },
  forgotPassword(email, callback){
    request.post(forgotPasswordRoute)
      .set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
      .send({email})
      .end(callback);
  },
  activateAccount(token, callback){
    const url = `${activateAccountRoute}?token=${token}`;
    request.put(url)
      .end(callback);
  }
};