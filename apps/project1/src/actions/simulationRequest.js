import {ajax} from 'utils/ajax';
import url from 'utils/Url';
import {
	SIMULATION_REQUEST_SUCCESS, SIMULATION_REQUEST_FAIL,
	} from 'constants/ActionTypes';

function simulationRquestSuccess(data, msg){
	return {
		type: SIMULATION_REQUEST_SUCCESS,
		data,
		msg,
	}
}

function simulationRquestFail(msg){
	return {
		type: SIMULATION_REQUEST_FAIL,
		msg,
	}
}

export function simulationRquestAction(args){
	return function (dispatch) {
		console.log('actions>>>dispath:' + dispatch);
		/*
			//真是请求
			ajax({
				method : 'GET',
				url :  url.QUERY_ALL_USER,
				query : {'args': args},
				type : 'json',
				success : function(data) {
				  return dispatch(simulationRquestSuccess(data));
				},
				error : function(data) {
				  return dispatch(simulationRquestFail('request fail'));
				}	
			});
		*/
		//假设请求成功
		return dispatch(simulationRquestSuccess('我是后台返回数据：hjzgg!!!', '获取数据成功'));
  };
}