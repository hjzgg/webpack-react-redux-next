import React from 'react';
import {connect} from 'react-redux';
import {Button} from 'antd';
import 'less/common.less';
var mapStateToProps = function(state){
	return {
	}
};

class ChildPage extends React.Component{
	constructor(props){
		super(props);
	    this.returnParentPage = this.returnParentPage.bind(this);
	}

	componentDidMount() {
		const { dispatch} = this.props;
		//加载该页面的数据
	}

	componentWillReceiveProps(nextProps) {
	}

	returnParentPage() {
		this.context.history.pushState(null, 'pageExchange');
	}

	render() {
		const parentPageMsg = this.props.params.parentPageMsg;
		return (
			<div className='main'>
				<div className='content'>
	    			<Button type="ghost" onClick={this.returnParentPage}>返回父页面</Button>
		    		{
		    			parentPageMsg ? (<div><span>{parentPageMsg}</span></div>) : (null)
		    		}
	    		</div>
	    	</div>
		);
	}
}

ChildPage.contextTypes = {
  history: React.PropTypes.object.isRequired,
};
module.exports = connect(mapStateToProps)(ChildPage);