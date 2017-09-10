import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, NavLink} from 'react-router-dom';
import { logout } from '../actions/user';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { brown500 } from 'material-ui/styles/colors';
const Authenticated = (props) => {
  return (<IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon color={brown500}/></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Sign out" onClick={() => {
      props.dispatch(logout());
    }} />
  </IconMenu>);
};
Authenticated.propTypes = {
  dispatch: PropTypes.func
};
Authenticated.muiName = 'AuthenticatedMenu';
class MenuBar extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const { user } = this.props;
    const userButton = user.get('isAuthenticated') ? <Authenticated dispatch={this.props.dispatch}/> :
      <NavLink className="padding-large menubar-link" to="/login">{t('LOGIN')}</NavLink>;
    return (
      <nav className="medium-background menubar-position">
        <NavLink exact className="padding-large menubar-link" to="/">{t('HOME')}</NavLink>
        <NavLink className="padding-large menubar-link" to="/order">{t('ORDERS')}</NavLink>
        {userButton}
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