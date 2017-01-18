/*
**author: zhangzhzhc
**desc: 注册路由信息
*/
import { Route, IndexRoute, Redirect } from 'react-router';
import React from 'react';

import Home from 'modules/Home';
import ModuleRouters from 'routes/ModuleRouters';
import Extend from 'modules/Extend';

import Demo from 'modules/Demo';
import ChildPage from 'components/ChildPage';
import FrontAndRearInteractive from 'components/FrontAndRearInteractive';
import ShowSelfMsg from 'components/ShowSelfMsg';
import PageExchange from 'components/PageExchange';

export default (
  <Route path="/" component={ModuleRouters}>
    <IndexRoute component={Home} />
    <Route path="/demo" component={ModuleRouters}>
    	<IndexRoute component={Demo} />
    	<Route path="/childDemoPage(/:parentPageMsg)" component={ChildPage}/>
    </Route>

    /******************/
    /*扩展页面信息*/
    <Route path="/extend" component={Extend} />
    /*页面切换*/
    <Route path="/pageExchange" component={PageExchange} />
    <Route path="/childDemoPage(/:parentPageMsg)" component={ChildPage}/>
    /*页面渲染显示信息*/
    <Route path="/showSelfMsg" component={ShowSelfMsg} />
    /*模拟前后台交互*/
    <Route path="/frontAndRearInteractive" component={FrontAndRearInteractive} />
    /******************/

    /* 也可以使用 this.context.history.pushState
    <Route path="/demo" component={Demo} />
	<Route path="/childDemoPage(/:parentPageMsg)" component={ChildPage}/>*/
    <Redirect from="index.html" to="/" />
  </Route>
);
