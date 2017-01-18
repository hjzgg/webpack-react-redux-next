import React from 'react';
import {connect} from 'react-redux';
import {Button, Form, Input, message} from 'antd';
const FormItem = Form.Item;
import {initExtendData, saveExtendDataAction} from 'actions/extendPage';
var mapStateToProps = function(state){
	return {
		extendStore: state.extendStore
	}
};

class ExtendPage extends React.Component{
	constructor(props){
		super(props);
		this.state = {

		}

		this.saveExtendData = this.saveExtendData.bind(this);
		this.checkText = this.checkText.bind(this);
	}

	checkText(rule, value, callBack) {
		if(/\s+/.test(value)) {
			callBack("不能有空白字符");
		} else {
			callBack();
		}
 	}

	saveExtendData() {
        this.props.callBack();//保存成功后，更改父页面的childState的状态
		this.props.form.validateFields((err, values) => {
	      if (!err) {//表单符合标准
	        console.log('save ExtendPage values: ' + JSON.stringify(values));
	        const {dispatch} = this.props;
	        dispatch(saveExtendDataAction(values));
	      }
    	});
	}

	componentDidMount() {
		const { dispatch} = this.props;
		//初始化扩展页的数据
		dispatch(initExtendData());
	}

	componentWillReceiveProps(nextProps) {
		const { extendStore, childState } = nextProps;
		if(extendStore && extendStore.msg) {
			message.info(extendStore.msg, 5);
			extendStore.msg = null;
		}

		if(childState) {//父页面 改变 子页面的状态
			this.saveExtendData();
		}
	}


	render() {
		const { getFieldProps } = this.props.form;
		const { extendStore } = this.props;
		const inputValue = extendStore && extendStore.data && extendStore.data.extendInputText || null;
		const inputProps = getFieldProps('extendInputText', {
            initialValue: inputValue,
            rules: [
            		{required: true, message: 'the input is required' },
            		{validator: this.checkText}
            	],
            validateTrigger: "onBlur"
        });
		return (
			<div>
				<Form>
			      <FormItem {...{labelCol: { span: 6 }, wrapperCol: { span: 14 }}} label="扩展本文: ">
			      	<Input {...inputProps} type="text" id="extendInputText"/>
			      </FormItem>
			    </Form>
	    	</div>
		);
	}
}
ExtendPage = Form.create()(ExtendPage);
module.exports = connect(mapStateToProps)(ExtendPage);