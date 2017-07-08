import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import Address from '../components/address.jsx';
import { register } from '../actions/user';
class RegisterUserContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstname: '',
        lastname: '',
        email: '',
        address:{
          street:'',
          housenumber:'',
          busnumber:'',
          postalcode:'',
          city:'',
          country:'belgium'
        }
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.getErrorMessageForInput = this.getErrorMessageForInput.bind(this);
    this.onRegisterClick = this.onRegisterClick.bind(this);
  }
  handleChange(prop, e){
    var currentUserState = this.state.user;
    currentUserState[prop] = e.target.value;
    this.setState({user:currentUserState});
  }
  handleChangeAddress(prop, value){
    var currentUserState = this.state.user;
    currentUserState.address[prop] = value;
    this.setState({user:currentUserState});
  }
  onRegisterClick(){
    //todo add validation
    this.props.dispatch(register(this.state.user));
  }
  getErrorMessageForInput(){
    return '';
  }
  render() {
    return (<div className="container">
      <div className="light-background padding-left-right-large padding-bottom-large" style={{maxWidth:'720px'}}>
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
            />
          </div>
          <div className="flex-col">
            <TextField
              id="usr-register-lastname"
              floatingLabelText="Lastname"
              value={this.state.user.lastname}
              onChange={this.handleChange.bind(null, 'lastname')}
            />
          </div>
        </div>
        <div className="margin-left-right-small">
          <TextField
            id="usr-register-email"
            floatingLabelText="Email"
            value={this.state.user.email}
            onChange={this.handleChange.bind(null, 'email')}
          />
        </div>
        <Address onChange={this.handleChangeAddress} address={this.state.user.address} title={'Personal address'}
          getErrorMessageForInput={this.getErrorMessageForInput}/>
        <div className="align-content-right">
          <FlatButton label="Register" primary onClick={this.onRegisterClick}/>
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

RegisterUserContainer.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect(
  mapStateToProps
)(RegisterUserContainer);