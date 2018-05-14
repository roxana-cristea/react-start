import moment from 'moment';

import constants from '../helpers/constants';

export default function dispatcherReducer(state = { lastAction: null }, action) {

	if (process.env.ENV === constants.ENV.DEVELOPMENT) {
		console.info(action.type);
	}
	let lastAction = {
		type: action.type,
		time: moment()
	};

	return Object.assign({}, state, {
		lastAction: lastAction
	});

};
