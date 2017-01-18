import assign from 'lodash/assign';
import {
	INIT_EXTEND_DATA_SUCCESS, INIT_EXTEND_DATA_FAIL, SAVE_EXTEND_DATA_SUCCESS
	}  from 'constants/ActionTypes';

function extendStore(state={
		msg: null,
		data: null,
		code: null,
	}, action) {

	switch(action.type) {
		case INIT_EXTEND_DATA_SUCCESS:
			return assign({}, state, {
	            msg: action.msg,
	            data: action.data,
	            code: 'success',
	        });
		case INIT_EXTEND_DATA_FAIL:
			return assign({}, state, {
	            msg: action.msg,
	            data: null,
	            code: 'fail',
	        });
	    case SAVE_EXTEND_DATA_SUCCESS:
	    	return assign({}, state, {
	    		msg: null,
	    		data: action.data,
	    		code: null,
	    	});
	    default:
	    	return state;
	}
}

module.exports = extendStore;