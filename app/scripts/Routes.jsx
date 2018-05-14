import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';

import App from './App.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';

import configureStore from './stores';
import constants from './helpers/constants';

const store = configureStore();

export default class Routes extends React.Component {

	render() {
		const history = createHistory();

		return (
			<Provider store={ store }>
				<HashRouter>
					<App>
						<Switch>
							<Route exact path='/' component={ Home } />
							<Route
								name='404'
								path='*'
								component={ NotFound } />
						</Switch>
					</App>
				</HashRouter>
			</Provider>
		);
	}

};
