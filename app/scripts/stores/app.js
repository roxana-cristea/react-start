/* global process */
import moment from 'moment';

import constants from '../helpers/constants';

export const initialState = { lastAction: null };

export default function dispatcherReducer(state = initialState, action) {
  if (process.env.ENV === constants.ENV.DEVELOPMENT) {
    console.info(action.type);
  }
  const lastAction = {
    type: action.type,
    time: moment(),
  };

  return Object.assign({}, state, {
    lastAction,
  });
}
