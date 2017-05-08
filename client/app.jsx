import React from 'react';
import ReactDOM from 'react-dom';
import LoginContainer from './containers/loginContainer.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'
require('./styles/main.scss');

let store = createStore(todoApp);

const App = () => (
  <MuiThemeProvider>
    <LoginContainer />
  </MuiThemeProvider>
);

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('app')
);