import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ContentSection from '../components/contentSection.jsx';
const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae risus at mauris pretium eleifend. Vivamus interdum sodales bibendum. Nam feugiat at sapien et euismod. Aliquam cursus ipsum nec sem efficitur blandit. Fusce non ligula eget lacus semper finibus id eget lorem. Nulla sit amet viverra ligula. Donec gravida, sapien a laoreet tristique, tortor magna venenatis quam, sed pulvinar ante lectus placerat leo. Sed elementum, mi non laoreet semper, odio justo condimentum turpis, id pulvinar urna arcu eget mi. Phasellus efficitur, urna nec aliquam aliquam, tortor elit dapibus purus, rhoncus tempus lorem lacus nec neque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.";
class HomeContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <div className="full-width" style={{alignSelf: 'baseline'}}>
          <ContentSection transparent>
            <h2>I'M A BANNER</h2>
            <div>{lorem}</div>
          </ContentSection>
          <ContentSection>
            <h2>I'M SOME CONTENT 1</h2>
            <div>{lorem}</div>
          </ContentSection>
          <ContentSection>
            <h2>I'M SOME CONTENT 2</h2>
            <div>{lorem}</div>
          </ContentSection>
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