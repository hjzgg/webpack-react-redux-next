import {
	INIT_EXTEND_DATA_SUCCESS, INIT_EXTEND_DATA_FAIL, SAVE_EXTEND_DATA_SUCCESS,
	} from 'constants/ActionTypes';


function initExtendDataResult (msg, data, code) {
	if(code == 'success') {
		return {
			type: INIT_EXTEND_DATA_SUCCESS,
			data,
			msg,
			code,
		}
	} else {
		return {
			type: INIT_EXTEND_DATA_FAIL,
			msg,
			code,
		}
	}
}

export function initExtendData() {
	return function (dispatch) {
		dispatch(initExtendDataResult('初始化扩展页数据成功', {extendInputText: 'hjzgg'}, 'success'));
	}
}

function saveExtendDataResult (value) {
	return {
		type: SAVE_EXTEND_DATA_SUCCESS,
		data: value
	}
}
export function saveExtendDataAction(values) {
	return function(dispatch) {
		dispatch(saveExtendDataResult(values))
	}
}