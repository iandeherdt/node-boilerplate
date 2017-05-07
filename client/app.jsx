import React from 'react';
import ReactDOM from 'react-dom';
import LoginContainer from './containers/loginContainer.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
require('./styles/main.scss');
import * as injectTapEventPlugin from 'react-tap-event-plugin';

const App = () => (
  <MuiThemeProvider>
    <LoginContainer />
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);