import React from 'react';
import {connect} from 'react-redux';
import {Button} from 'antd';
import 'less/common.less';
var mapStateToProps = function(state){
	return {
		myRequest: state.myRequest,
	}
};

class ShowSelfMsg extends React.Component{
	constructor(props){
		super(props);
	    this.state = {
	    	showContent: false
	    };
	    this.showContent = this.showContent.bind(this);
	}

	showContent() {
		this.setState({
			showContent: !this.state.showContent
		});
	}

	componentDidMount() {
		const { dispatch} = this.props;
		//加载该页面的数据
	}

	componentWillReceiveProps(nextProps) {
	}

	render() {
		let showContent = this.state.showContent;
		return (
			<div className='main'>
				<div className='content'>
	    			<Button type="ghost" onClick={this.showContent}>{!this.state.showContent ? '单击显示内容' : '单击隐藏内容'}</Button>
		    		{
		    			showContent ? (<div><span>大家好，我是hjzgg</span></div>) : (null)
		    		}
		    		<div className='back'>
	    				<Button type="ghost" onClick={()=>this.context.history.pushState({}, '/')}>返回</Button>
	    			</div>
	    		</div>
	    	</div>
		);
	}
}

ShowSelfMsg.contextTypes = {
  history: React.PropTypes.object.isRequired,
};
module.exports = connect(mapStateToProps)(ShowSelfMsg);