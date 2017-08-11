import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
 // => 'foo bar'
const ContentSection = ({ children, transparent }) => {
  const classes = classNames('full-width', 'medium-background', 'padding-left-right-large',
    'padding-top-bottom-super-large', 'centered-content',  {transparent});
  return (<div className={classes}  >
            <div className="max-content-width">
              {children}
            </div>
        </div>);

};
ContentSection.propTypes = {
  children: PropTypes.node,
};
export default ContentSection;