const serverUrl = 'http://localhost:4000';
const loginRoute = "/auth/login";
import request from 'superagent';

module.exports = {
  login(username, password, callback){
    const loginUrl = serverUrl + loginRoute;
    request.post(loginUrl)
    .send({username: username, password: password})
    .end(callback);
  }
}