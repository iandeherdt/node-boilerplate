import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import LoginContainer from './containers/loginContainer.jsx';
import HomeContainer from './containers/homeContainer.jsx';
import OrderContainer from './containers/orderContainer.jsx';
import RegisterUserContainer from './containers/registerUserContainer.jsx';
import ResetPasswordContainer from './containers/resetPasswordContainer.jsx';
import ForgotPasswordContainer from './containers/forgotPasswordContainer.jsx';
import ActivateAccountContainer from './containers/activateAccountContainer.jsx';
import PrivateRoute from './components/privateRoute.jsx';
import AuthComplete from './components/authComplete.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { BrowserRouter, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import MenuBar from './components/menuBar.jsx';
import ErrorBar from './components/errorBar.jsx';
import theme from './styles/material-theme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const history = createBrowserHistory();
injectTapEventPlugin();
require('./styles/main.scss');

const store = configureStore();

//configure translation
import { Configure, Translate } from './I18n/translate';
Configure('en');
global.t = Translate;

const App = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
    <BrowserRouter history={history}>
      <div>
        <MenuBar />
        <ErrorBar />
        <div className="container">
          <Route exact path="/" component={HomeContainer} />
          <Route path="/login" component={LoginContainer}/>
          <Route path="/register" store={store} component={RegisterUserContainer}/>
          <Route path="/resetpassword" store={store} component={ResetPasswordContainer}/>
          <Route path="/forgotpassword" store={store} component={ForgotPasswordContainer}/>
          <Route path="/activateaccount" store={store} component={ActivateAccountContainer}/>
          <PrivateRoute path="/order" store={store} component={OrderContainer}/>
          <AuthComplete path="/authComplete" />
        </div>
      </div>
    </BrowserRouter>
  </MuiThemeProvider>
);
ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('app')
);