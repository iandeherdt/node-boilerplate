const serverUrl = 'http://localhost:4000';
const loginRoute = '/auth/login';
const resetPasswordRoute = '/auth/password/reset';
const userRoute = '/user';
import request from 'superagent';

module.exports = {
  login(username, password, callback){
    const url = serverUrl + loginRoute;
    request.post(url)
      .send({username: username, password: password})
      .end(callback);
  },
  getUser(callback){
    const url = serverUrl + userRoute;
    request.get(url)
      .set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
      .end(callback);
  },
  registerSocial(user, callback){
    const url = `${serverUrl}${userRoute}/${user.id}`;
    request.put(url)
      .set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
      .send(user)
      .end(callback);
  },
  register(user, callback){
    const url = `${serverUrl}${userRoute}`;
    request.post(url)
      .set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
      .send(user)
      .end(callback);
  },
  resetPassword(password, confirmpassword, token, callback){
    const url = `${serverUrl}${resetPasswordRoute}?token=${token}`;
    request.put(url)
      .set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
      .send({password, confirmpassword})
      .end(callback);
  }
};