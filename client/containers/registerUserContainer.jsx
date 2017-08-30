import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import Address from '../components/address.jsx';
import { register, registerSocial } from '../actions/user';
import validate from '../../validation/validateUser';
import ContentSection from '../components/contentSection.jsx';
import Loading from '../components/loading.jsx';
import { REQUEST_STATUSSES } from '../constants';
class RegisterUserContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstname: '',
        name: '',
        username: '',
        password: '',
        confirmPassword: ''
      },
      address:{
        street:'',
        house:'',
        bus:'',
        postal:'',
        city:'',
        country:'belgium'
      },
      validationErrors:[]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.getErrorMessageForInput = this.getErrorMessageForInput.bind(this);
    this.onRegisterClick = this.onRegisterClick.bind(this);
  }
  handleChange(prop, e){
    let currentUserState = this.state.user;
    currentUserState[prop] = e.target.value;
    this.setState({user: currentUserState});
  }
  handleChangeAddress(prop, value){
    let currentUAddressState = this.state.address;
    currentUAddressState[prop] = value;
    this.setState({address: currentUAddressState});
  }
  onRegisterClick(){
    //todo add validation
    const serverUser = this.props.user.get('user') ? this.props.user.get('user').toJS() : null;
    const user = Object.assign({}, serverUser, this.state.user, this.state.address);
    const validation = validate(user);
    if(validation.error && validation.error.isJoi){
      this.setState({validationErrors: validation.error.details});
      return;
    } else if(serverUser && serverUser.id){
      this.props.dispatch(registerSocial(user));
    } else {
      this.props.dispatch(register(user));
    }
    this.setState({validationErrors: []});
  }
  getErrorMessageForInput(inputName){
    if(this.state.validationErrors && this.state.validationErrors.length !== 0){
      const error = this.state.validationErrors.find(x => x.path.toLowerCase() === inputName.toLowerCase());
      if(error){
        return error.message;
      }
    }
    return null;
  }
  render() {
    if(this.props.user.get('registerUserStatus') === REQUEST_STATUSSES.REQUEST){
      return <Loading title={t('isRegistering')}/>;
    }
    if(this.props.user.get('registerUserStatus') === REQUEST_STATUSSES.SUCCESS){
      return (<ContentSection className="margin-top-large">
        <h2>{t('REGISTER USER SUCCESS')}</h2>
        <div>{t('We have registered your account, but you still need to activate it.')}</div>
      </ContentSection>);
    }
    return (<div className="container margin-top-large">
      <form className="light-background padding-left-right-large padding-bottom-large" style={{maxWidth:'720px'}}>
        <div className="margin-left-right-small">
          <h2 className="inlineH2">{t('personalInfoTitle')}</h2>
        </div>
        <div className="flex-row">
          <div className="flex-col">
            <TextField
              id="usr-register-firstname"
              floatingLabelText="Firstname"
              value={this.state.user.firstname}
              onChange={this.handleChange.bind(null, 'firstname')}
              errorText={this.getErrorMessageForInput('firstname')}
            />
          </div>
          <div className="flex-col">
            <TextField
              id="usr-register-name"
              floatingLabelText="Name"
              value={this.state.user.name}
              onChange={this.handleChange.bind(null, 'name')}
              errorText={this.getErrorMessageForInput('name')}
              autoComplete="off"
            />
          </div>
        </div>
        <div className="flex-row">
          <div className="flex-col">
            <TextField
              id="usr-register-username"
              floatingLabelText="Email (username)"
              value={this.state.user.username}
              onChange={this.handleChange.bind(null, 'username')}
              errorText={this.getErrorMessageForInput('username')}
              autoComplete="off"
            />
          </div>
        </div>
        <div className="flex-row">
          <div className="flex-col">
            <TextField
              id="usr-register-password"
              floatingLabelText="Password"
              value={this.state.user.password}
              type="password"
              onChange={this.handleChange.bind(null, 'password')}
              errorText={this.getErrorMessageForInput('password')}
              autoComplete="off"
            />
          </div>
          <div className="flex-col">
            <TextField
              id="usr-register-confirmpassword"
              floatingLabelText="Confirm password"
              value={this.state.user.confirmPassword}
              type="password"
              onChange={this.handleChange.bind(null, 'confirmPassword')}
              errorText={this.getErrorMessageForInput('confirmPassword')}
              autoComplete="off"
            />
          </div>
        </div>
        <Address onChange={this.handleChangeAddress} address={this.state.address} title={'Personal address'}
          getErrorMessageForInput={this.getErrorMessageForInput}/>
        <div className="align-content-right">
          <FlatButton label="Register" primary onClick={this.onRegisterClick}/>
        </div>
      </form>
    </div>);
  }
}
function mapStateToProps(state) {
  return {
    user: state.user
  };
}

RegisterUserContainer.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect(
  mapStateToProps
)(RegisterUserContainer);