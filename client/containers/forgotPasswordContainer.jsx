import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { forgotPassword } from '../actions/user';
import PropTypes from 'prop-types';

class ResetPasswordContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
    };
    this.onConfirm = this.onConfirm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  onConfirm(){
    this.props.dispatch(forgotPassword(this.state.email));
  }
  handleChange(prop, e){
    var currentState = this.state;
    currentState[prop] = e.target.value;
    this.setState(currentState);
  }
  render() {
    return (<div className="container">
      <div className="light-background padding-large">
        <div>
          <TextField
            id="usr-forgotpw-email"
            floatingLabelText={t('email')}
            type="email"
            value={this.state.email}
            onChange={this.handleChange.bind(null, 'email')}
          />
        </div>
        <div className="align-content-right">
          <FlatButton onClick={this.onConfirm} label={t('confirm')} primary/>
        </div>
      </div>
    </div>);
  }
}

ResetPasswordContainer.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(ResetPasswordContainer);