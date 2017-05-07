import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
class LoginContainer extends Component {
  constructor(props) {
    injectTapEventPlugin();
    super(props);
    this.state = {
      user:{
        userName:'',
        password:''
      },
      next:'',
    };
    this.onLogin = this.onLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  onLogin(){
    console.log('login');
  }
  handleChange(prop, value){
    var currentUserState = this.state.user;
    currentUserState[prop] = value;
    this.setState({user:currentUserState});
  }
  render() {
    return (<div className="container">
    <div className="light-background large-padding">
      <div>
        <TextField
          id="usr-login-username"
          floatingLabelText="Username"
          value={this.state.value}
          onChange={this.handleChange.bind(null, 'userName')}
        />
      </div>
      <div>
        <TextField
          id="usr-login-password"
          floatingLabelText="Password"
          type="password"
          value={this.state.value}
          onChange={this.handleChange.bind(null, 'password')}
        />
      </div>
      <div className="align-content-right">
        <FlatButton onClick={this.onLogin} label="Login" primary/>
      </div>
      </div>
    </div>);
  }
}

export default LoginContainer;