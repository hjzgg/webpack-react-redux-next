import React from 'react';
import {connect} from 'react-redux';
import {Button} from 'antd';
import {simulationRquestAction} from 'actions/simulationRequest';
var mapStateToProps = function(state){
	return {
		myRequest: state.myRequest,
	}
};

class ButtonClick extends React.Component{
	constructor(props){
		super(props);
	    this.state = {
	    	showContent: false
	    };
	    this.showContent = this.showContent.bind(this);
	    this.simulationRequest = this.simulationRequest.bind(this);
	    this.gotoChildPage = this.gotoChildPage.bind(this);
	}

	showContent() {
		this.setState({
			showContent: true
		});
	}

	simulationRequest() {
		const {dispatch} = this.props;
		console.log('props>>>dispath:' + dispatch);
		dispatch(simulationRquestAction());
	}

	gotoChildPage() {
		console.log('this.context.history>>>>>>' + JSON.stringify(this.context.history));
		this.context.history.pushState({}, 'childDemoPage/' + '我是父页面信息');
	}

	componentDidMount() {
		const { dispatch} = this.props;
		//加载该页面的数据
	}

	componentWillReceiveProps(nextProps) {
	    const { myRequest } = nextProps;
	    alert('请求结果：code=' + myRequest.code + ', msg=' + myRequest.msg);
	}

	render() {
		let showContent = this.state.showContent;
		const { myRequest } = this.props;
		return (
			<div>
				<div>
	    			<Button type="ghost" onClick={this.showContent}>单击显示内容</Button>
	    		</div>
	    		{
	    			showContent ? (<div><span>大家好，我是hjzgg</span></div>) : (null)
	    		}

	    		<div>
	    			<Button type="ghost" onClick={this.simulationRequest}>模拟请求</Button>
	    		</div>
	    		{
	    			myRequest && myRequest.data ? (<div><span>{myRequest.data}</span></div>) : (null)
	    		}
	    		<div>
	    			<Button type="ghost" onClick={this.gotoChildPage}>进入子页面</Button>
	    		</div>
	    	</div>
		);
	}
}

ButtonClick.contextTypes = {
  history: React.PropTypes.object.isRequired,
};
module.exports = connect(mapStateToProps)(ButtonClick);