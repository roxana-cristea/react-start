import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

import configureStore from './stores';

const store = configureStore();

export default class Routes extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <App>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route
                name="404"
                path="*"
                component={NotFound}
              />
            </Switch>
          </App>
        </HashRouter>
      </Provider>
    );
  }
}
