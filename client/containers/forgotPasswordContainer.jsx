import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { forgotPassword } from '../actions/user';
import PropTypes from 'prop-types';
import ContentSection from '../components/contentSection.jsx';
import Loading from '../components/loading.jsx';
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
    const forgotPasswordContent = (<div className="light-background padding-large">
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
    </div>);
    const forgotPasswordSuccessContent = (<ContentSection>
      <h2>{t('RESET PASSWORD')}</h2>
      <div>{t('We have sent a reset link please check you email for further instructions.')}</div>
    </ContentSection>);
    let content = <Loading title={t('isSendingForgotPwLink')}/>;
    if(!this.props.user.get('isSendingForgotPwLink') && this.props.user.get('sentPwLinkTo') ){
      content = forgotPasswordSuccessContent;
    } else if(!this.props.user.get('isSendingForgotPwLink')){
      content = forgotPasswordContent;
    }
    return (<div className="container">
      {content}
    </div>);
  }
}

ResetPasswordContainer.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.object

};
function mapStateToProps(state) {
  return {
    user: state.user
  };
}
export default connect(mapStateToProps)(ResetPasswordContainer);