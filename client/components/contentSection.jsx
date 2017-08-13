import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
const ContentSection = ({ children, transparent }) => {
  const classes = classNames('full-width', 'medium-background',
    'padding-top-bottom-super-large', 'centered-content', {transparent});
  return (<div className={classes}>
    <div className="max-content-width padding-left-right-large">
      {children}
    </div>
  </div>);

};
ContentSection.propTypes = {
  children: PropTypes.node,
  transparent: PropTypes.bool
};
export default ContentSection;