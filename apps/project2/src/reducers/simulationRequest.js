import {
	SIMULATION_REQUEST_SUCCESS, SIMULATION_REQUEST_FAIL,
	}  from 'constants/ActionTypes';
import assign from 'lodash/assign';

function myRequest(state = {
		data: null,
		msg: null,
		code: null,
	}, action) {
	console.log('reducer action属性>>>>>' + JSON.stringify(action));

	switch(action.type) {
		case SIMULATION_REQUEST_SUCCESS:
			return assign({}, state, {
	            msg: action.msg,
	            data: action.data,
	            code: 'success',
	          });

		case SIMULATION_REQUEST_FAIL:
			return assign({}, state, {
	            msg: action.msg,
	            data: null,
	            code: 'fail',
	          });
		default:
			return state;
	}

}

module.exports = myRequest;