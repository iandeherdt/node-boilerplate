import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class HomeContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <div className="container">
          <div className="light-background padding-large">
            <p>I'm home</p> {//eslint-disable-line
              }
            <div>
              <Link to="/order">{'Orders'}</Link>
            </div>
          </div>
        </div>);
  }
}
HomeContainer.propTypes = {
  user: PropTypes.object
};
function mapStateToProps(state) {
  return {
    user: state.user
  };
}
export default connect(mapStateToProps)(HomeContainer);