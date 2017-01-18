//所有reducer请在这里注册

import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';

import myRequest from 'reducers/simulationRequest';
import extendStore from 'reducers/extendPage';
export default combineReducers({
	routing: routeReducer,
	myRequest,
	extendStore,
});
