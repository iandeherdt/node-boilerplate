import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';



const PrivateRoute = ({ component: Component, store: store, ...rest }) => (
  <Route {...rest} render={props => {
    if(store.getState().user.get('isAuthenticated')){
      return <Component {...props}/>;
    }else {
      return (<Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>);
    }
  }}/>
);

PrivateRoute.propTypes = {
  location: PropTypes.string,
  component: PropTypes.func,
  store: PropTypes.object.isRequired
};

PrivateRoute.displayName = 'PrivateRoute';

export default PrivateRoute;

