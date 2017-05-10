import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { login } from '../actions/user';
class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username:'',
        password:''
      },
      next:'',
    };
    this.onLogin = this.onLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  onLogin(){
    this.props.dispatch(login(this.state.user.username, this.state.user.password));
  }
  handleChange(prop, e){
    var currentUserState = this.state.user;
    currentUserState[prop] = e.target.value;
    this.setState({user:currentUserState});
  }
  render() {
    return (<div className="container">
    <div className="light-background large-padding">
      <div>
        <TextField
          id="usr-login-username"
          floatingLabelText="Username"
          value={this.state.user.username}
          onChange={this.handleChange.bind(null, 'username')}
        />
      </div>
      <div>
        <TextField
          id="usr-login-password"
          floatingLabelText="Password"
          type="password"
          value={this.state.user.password}
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

function mapStateToProps(state) {
  console.log(state);
  return {
    user: state.user
  };
}

LoginContainer.propTypes = {
  actions: PropTypes.shape({
    login: PropTypes.func
  }),
  user: PropTypes.object,
};

export default connect(
  mapStateToProps
)(LoginContainer);