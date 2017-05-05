import React, { Component, PropTypes } from 'react';

class LoginContainer extends Component {
  constructor(props) {
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
    return (<form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange.bind(null, 'userName')} />
        </label>
        <label>
          Password:
          <input type="text" value={this.state.value} onChange={this.handleChange.bind(null, 'password')} />
        </label>
        <input type="submit" value="Submit" />
      </form>);
  }
}

export default LoginContainer;