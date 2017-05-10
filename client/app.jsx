import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux'
import reducers from './reducers'
import configureStore from './configureStore'
import LoginContainer from './containers/loginContainer.jsx';
require('./styles/main.scss');

const store = configureStore();

const App = () => (
  <MuiThemeProvider>
    <LoginContainer />
  </MuiThemeProvider>
);

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('app')
);