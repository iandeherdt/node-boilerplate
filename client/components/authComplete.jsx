import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { oAuthLoginSuccess } from '../actions/user';
const AuthComplete = ({ ...rest }) => {
  return (<Route {...rest} render={props => {
    const parsed = queryString.parse(props.location.search);
    if(parsed.token){
      const registered = (parsed.registered == 'true'); //eslint-disable-line eqeqeq
      rest.dispatch(oAuthLoginSuccess({name: parsed.user, id: parsed.id}, parsed.token));
      if(registered){
        return (<Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }}/>);
      } else {
        return (<Redirect to={{
          pathname: '/register'
        }}/>);
      }
    } else {
      return (<Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>);
    }
  }}/>);
};

AuthComplete.propTypes = {
  location: PropTypes.string,
  component: PropTypes.func,
  match: PropTypes.object
};

AuthComplete.displayName = 'AuthComplete';

export default connect()(AuthComplete);