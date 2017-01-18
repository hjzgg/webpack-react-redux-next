import React from 'react';
import {connect} from 'react-redux';
import {Button} from 'antd';
import 'less/common.less';
var mapStateToProps = function(state){
	return {
		myRequest: state.myRequest,
	}
};

class PageExchange extends React.Component{
	constructor(props){
		super(props);
	    this.state = {
	    	showContent: false
	    };
	    this.gotoChildPage = this.gotoChildPage.bind(this);
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
	}

	render() {
		let showContent = this.state.showContent;
		const { myRequest } = this.props;
		return (
			<div className='main'>
	    		<div className='content'>
	    			<Button type="ghost" onClick={this.gotoChildPage}>进入子页面</Button>
	    			<div className='back'>
	    				<Button type="ghost" onClick={()=>this.context.history.pushState({}, '/')}>返回</Button>
	    			</div>
	    		</div>
	    	</div>
		);
	}
}

PageExchange.contextTypes = {
  history: React.PropTypes.object.isRequired,
};
module.exports = connect(mapStateToProps)(PageExchange);