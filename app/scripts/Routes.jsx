import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import App from './App.jsx';

import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';

export default class Routes extends React.Component {

	render() {
		return (
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
		);
	}

};
