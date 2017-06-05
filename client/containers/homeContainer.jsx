import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class HomeContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<div className="container">
      <div className="light-background large-padding">
        <p>I'm home</p> {//eslint-disable-line
          }
        <div>
          <Link to="/order">{'Orders'}</Link>
        </div>
      </div>
     
    </div>);
  }
}

export default HomeContainer;