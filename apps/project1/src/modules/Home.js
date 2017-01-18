import React from 'react';
import 'less/home.less';
import { Scrollbars } from 'react-custom-scrollbars';
import {Menu} from 'antd';

//首页
export class Home extends React.Component{
  constructor(props) {
    super(props);
    this.changeRoute = this.changeRoute.bind(this);
  }
  componentDidMount() {
  }

  changeRoute(e) {
    this.context.history.pushState({}, e.key);
  }

  render() {
    return (
      <div className='home'>
        <Scrollbars style={{ height: 600 }}>
            <Menu className='menu' onClick={this.changeRoute}>
              <Menu.Item key='showSelfMsg'>页面渲染展示信息</Menu.Item>
              <Menu.Item key='frontAndRearInteractive'>模拟前后台交互</Menu.Item>
              <Menu.Item key='pageExchange'>页面切换</Menu.Item>
              <Menu.Item key='extend'>子组件扩展</Menu.Item>
            </Menu>
        </Scrollbars>
      </div>
    );
  }
}
Home.contextTypes = {
  history: React.PropTypes.object.isRequired,
};
module.exports = Home;
