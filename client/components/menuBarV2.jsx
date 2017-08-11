import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, NavLink} from 'react-router-dom';
import { logout } from '../actions/user';

class MenuBar extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const { user } = this.props;
    return (
      <nav className="medium-background menubar-position">
        <NavLink exact className="padding-large menubar-link" to="/">{t('HOME')}</NavLink>
        <NavLink className="padding-large menubar-link" to="/order">{t('ORDERS')}</NavLink>
        <NavLink className="padding-large menubar-link" to="/register">{t('REGISTER')}</NavLink>
        <NavLink className="padding-large menubar-link" to="/login">{t('LOGIN')}</NavLink>
      </nav>
    );
  }
}

MenuBar.propTypes = {
  user: PropTypes.object,
  history: PropTypes.object,
  dispatch: PropTypes.func
};
function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default withRouter(connect(mapStateToProps)(MenuBar));