import React from 'react';
import {connect} from 'react-redux';
import {Button} from 'antd';
import {simulationRquestAction} from 'actions/simulationRequest';
var mapStateToProps = function(state){
	return {
		myRequest: state.myRequest,
	}
};

class FrontAndRearInteractive extends React.Component{
	constructor(props){
		super(props);
	    this.state = {
	    	showContent: false
	    };
	    this.simulationRequest = this.simulationRequest.bind(this);
	}

	simulationRequest() {
		const {dispatch} = this.props;
		console.log('props>>>dispath:' + dispatch);
		dispatch(simulationRquestAction());
	}

	componentDidMount() {
		const { dispatch} = this.props;
		//加载该页面的数据
	}

	componentWillReceiveProps(nextProps) {
	    const { myRequest } = nextProps;
	    if(myRequest.code && myRequest.msg)
	    	alert('请求结果：code=' + myRequest.code + ', msg=' + myRequest.msg);
	}

	render() {
		const { myRequest } = this.props;
		return (
			<div className='main'>
	    		<div className='content'>
	    			<Button type="ghost" onClick={this.simulationRequest}>模拟请求</Button>
		    		{
		    			myRequest && myRequest.data ? (<div><span>{myRequest.data}</span></div>) : (null)
		    		}
		    		<div className='back'>
	    				<Button type="ghost" onClick={()=>this.context.history.pushState({}, '/')}>返回</Button>
	    			</div>
	    		</div>
	    	</div>
		);
	}
}
FrontAndRearInteractive.contextTypes = {
  history: React.PropTypes.object.isRequired,
};
module.exports = connect(mapStateToProps)(FrontAndRearInteractive);