const serverUrl = 'http://localhost:4000';
const loginRoute = "/auth/login";

const request = require('superagent');

module.exports = {
  login(username, password){
    const loginUrl = serverUrl + loginRoute;
    request.post(loginUrl)
    .send({username: username, password: password})
      .end((err, res) => {
        if(err){
          console.log(err);
        } else {
          console.log(res.body);
        }
      });
  }
}