import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import LoginContainer from './containers/loginContainer.jsx';
import HomeContainer from './containers/homeContainer.jsx';
import OrderContainer from './containers/orderContainer.jsx';
import PrivateRoute from './components/privateRoute.jsx';
import AuthComplete from './components/authComplete.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();
injectTapEventPlugin();
require('./styles/main.scss');


const store = configureStore();
const App = () => (
  <MuiThemeProvider>
    <Router history={history}>
      <div className="container">
        <Route exact path="/" component={HomeContainer} />
        <Route path="/login" component={LoginContainer}/>
        <Route path="/loginSuccess" component={AuthComplete}/>
        <PrivateRoute path="/order" store={store} component={OrderContainer}/>
        <AuthComplete path="/authComplete" />
      </div>
    </Router>
  </MuiThemeProvider>
);
ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('app')
);