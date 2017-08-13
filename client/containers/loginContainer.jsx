import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { login } from '../actions/user';
import PropTypes from 'prop-types';
import { NavLink} from 'react-router-dom';

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
    this.onFacebookLogin = this.onFacebookLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  onLogin(){
    this.props.dispatch(login(this.state.user.username, this.state.user.password));
  }
  onFacebookLogin(){
    window.location.href = '/auth/login/facebook';
  }
  handleChange(prop, e){
    var currentUserState = this.state.user;
    currentUserState[prop] = e.target.value;
    this.setState({user:currentUserState});
  }
  render() {
    return (<div className="container">
      <div className="light-background padding-large">
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
        <div className="align-content-center padding-large">
          <span>{'--- OR ---'}</span>
        </div>
        <div className="align-content-center">
          <FlatButton onClick={this.onFacebookLogin} label="Facebook" primary/>
        </div>
        <div className="align-content-center">
          <NavLink className="padding-large menubar-link" to="/register">{t('REGISTER')}</NavLink>
        </div>
        <div className="align-content-center">
          <NavLink className="menubar-link" to="/forgotpassword">{t('FORGOT PASSWORD?')}</NavLink>
        </div>
      </div>
    </div>);
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

LoginContainer.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect(
  mapStateToProps
)(LoginContainer);