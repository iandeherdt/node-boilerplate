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
      rest.dispatch(oAuthLoginSuccess({name: parsed.user}, parsed.token));
      if(parsed.registered == 'true'){ //eslint-disable-line eqeqeq
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