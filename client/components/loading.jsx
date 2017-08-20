import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Spinner from 'react-spinner-material';
const ContentSection = ({ transparent, title }) => {
  const classes = classNames('medium-background', 'centered-content', {transparent});
  return (<div className={classes} style={{position: 'fixed', left:0,
    right:0, top:'54px', bottom:0, display: 'flex', alignItems: 'center'}}>
    <div style={{display: 'flex', flexDirection: 'column', alignItems:'center'}}>
      <Spinner
        size={60}
        spinnerColor={'#333'}
        spinnerWidth={2}
        visible={true} />
      <h2>{title}</h2>
    </div>
  </div>);

};
ContentSection.propTypes = {
  transparent: PropTypes.bool,
  title: PropTypes.string
};
export default ContentSection;