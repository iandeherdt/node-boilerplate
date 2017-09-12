import React, { Component } from 'react';
import { connect } from 'react-redux';
import { activateAccount } from '../actions/user.actions';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import ContentSection from '../components/contentSection.jsx';
import Loading from '../components/loading.jsx';
import { REQUEST_STATUSSES } from '../constants';

class ActivateAccountContainer extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    const parsed = queryString.parse(this.props.location.search);
    this.props.dispatch(activateAccount(parsed.token));
  }
  render() {
    if(this.props.user.get('activateUserStatus') === REQUEST_STATUSSES.REQUEST){
      return <Loading title={t('isActivatingAccount')}/>;
    }
    if(this.props.user.get('activateUserStatus') === REQUEST_STATUSSES.SUCCESS){
      return (<ContentSection className="margin-top-large">
        <h2>{t('ACCOUNT ACTIVATED')}</h2>
        <div>{t('activateAccountSuccessMessage')}</div>
      </ContentSection>);
    }
    return null;
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

ActivateAccountContainer.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
  location: PropTypes.object,
  history: PropTypes.object
};

export default connect(
  mapStateToProps
)(ActivateAccountContainer);