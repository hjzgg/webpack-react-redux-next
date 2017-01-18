import React from 'react';
import {connect} from 'react-redux';
import {Button, Input, Form} from 'antd';
import ExtendPage from 'components/ExtendPage';
import 'less/common.less';
const FormItem = Form.Item;
var mapStateToProps = function(state){
	return {
		extendStore: state.extendStore
	}
};

class Page extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			childState: false,
		}
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.onSaveExtendPage = this.onSaveExtendPage.bind(this);
	}

	componentDidMount() {
		const { dispatch} = this.props;
		//加载该页面的数据
	}

	componentWillReceiveProps(nextProps) {
	}

	//通知扩展组件，准备保存了
	onSaveExtendPage() {
		if(this.state.childState) {
			this.setState({
				childState: false,
			});
		}
	}

	save(values) {
		//打印父级和子级文本
		alert(JSON.stringify(values));
	}

	handleSubmit() {
		var self = this;
		this.props.form.validateFields((err, values) => {
	      if (!err) {//表单符合标准
	        //values 为当前父页面的数据，接下来获取子页面的数据
	        this.setState({childState: true}, function() {
	        	const { extendStore } = self.props;
	        	values.extendData = extendStore && extendStore.data || extendStore;
	        	self.save(values);
	        });
	      }
    	});
	}

	render() {
		const { getFieldProps } = this.props.form;
		const inputProps = getFieldProps('inputText', {
            initialValue: '',
            rules: [
            		{required: true, message: 'the input is required' },
            	],
            validateTrigger: "onBlur"
        });
		return (
			<div style={{marginTop: 50, width: 600, marginLeft: 'auto', marginRight: 'auto'}}>
				<Form onSubmit={this.handleSubmit}>
			      <FormItem {...{labelCol: { span: 6 }, wrapperCol: { span: 14 }}} label="父级文本: ">
			      	<Input {...inputProps} id='inputText' type='text'/>
			      </FormItem>
			      <FormItem wrapperCol={{ span: 12, offset: 6 }}>
		          	<Button type="primary" htmlType="submit">提交</Button>
		       	  </FormItem>
			    </Form>

			    <ExtendPage
			    	childState={this.state.childState}
			    	callBack={this.onSaveExtendPage}
			    />

			    <div style={{float: 'right'}}>
    				<Button type="ghost" onClick={()=>this.context.history.pushState({}, '/')}>返回</Button>
    			</div>
	    	</div>
		);
	}
}
Page.contextTypes = {
  history: React.PropTypes.object.isRequired,
};
Page = Form.create()(Page);
module.exports = connect(mapStateToProps)(Page);