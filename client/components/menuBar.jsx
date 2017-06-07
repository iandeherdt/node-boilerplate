import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter} from 'react-router-dom';
import { logout } from '../actions/user';
const Authenticated = (props) => {
  return (<IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
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
    const { user, history } = this.props;
    return (
      <div>
        <AppBar
          title="Super awesome app"
          onTitleTouchTap={() => { history.push('/');}}
          iconElementRight={user.get('isAuthenticated') ? <Authenticated dispatch={this.props.dispatch}/> : <FlatButton onClick={(e) => {
            e.stopPropagation();
            history.push('/login');
          }} label="Login" />}
        />
      </div>
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