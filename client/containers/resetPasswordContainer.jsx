import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { resetPassword } from '../actions/user.actions';
import PropTypes from 'prop-types';
import queryString from 'query-string';

class ResetPasswordContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
    };
    this.onConfirm = this.onConfirm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  onConfirm(){
    const parsed = queryString.parse(this.props.location.search);
    this.props.dispatch(resetPassword(this.state.password, this.state.confirmPassword, parsed.token, this.props.history));
  }
  handleChange(prop, e){
    var currentState = this.state;
    currentState[prop] = e.target.value;
    this.setState(currentState);
  }
  render() {
    return (<div className="container margin-top-large">
      <div className="light-background padding-large">
        <div>
          <TextField
            id="usr-resetpw-password"
            floatingLabelText={t('password')}
            type="password"
            value={this.state.password}
            onChange={this.handleChange.bind(null, 'password')}
          />
        </div>
        <div>
          <TextField
            id="usr-resetpw-confirmpassword"
            floatingLabelText={t('confirmPassword')}
            type="password"
            value={this.state.confirmPassword}
            onChange={this.handleChange.bind(null, 'confirmPassword')}
          />
        </div>
        <div className="align-content-right">
          <FlatButton onClick={this.onConfirm} label={t('confirm')} primary/>
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

ResetPasswordContainer.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
  location: PropTypes.object,
  history: PropTypes.object
};

export default connect(
  mapStateToProps
)(ResetPasswordContainer);