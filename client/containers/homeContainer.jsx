import React, { Component } from 'react';
class HomeContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<div className="container">
      <div className="light-background large-padding">
        <p>I'm home</p>
      </div>
    </div>);
  }
}

export default HomeContainer;