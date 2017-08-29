import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { dismissError } from '../actions/error';
class ErrorBar extends Component {
  constructor(props){
    super(props);
    this.onDismissClick = this.onDismissClick.bind(this);
  }
  onDismissClick(){
    this.props.dispatch(dismissError(this.props.error.getIn([0, 'id'])));
  }
  render() {
    const { error } = this.props;
    if(error.size === 0){
      return null;
    }
    return (
      <div className="full-width error-bar" onClick={this.onDismissClick}>
        {error.getIn([0, 'message'])}
      </div>
    );
  }
}

ErrorBar.propTypes = {
  error: PropTypes.object,
  dispatch: PropTypes.func
};
function mapStateToProps(state) {
  return {
    error: state.error
  };
}

export default connect(mapStateToProps)(ErrorBar);