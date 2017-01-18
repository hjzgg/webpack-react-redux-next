var React = require('react');
var ReactDOM = require('react-dom');
var { Provider } = require('react-redux');
import { Router } from 'react-router';
import routes from 'routes';
import { createHashHistory, useBasename } from 'history';
import { syncReduxAndRouter } from 'redux-simple-router';
import { routeReducer } from 'redux-simple-router';

//初始化store
var configureStore = require('stores/configureStore');
//配置路由Base路径 createHistory
const history = useBasename(createHashHistory)({
  basename: '/',
});
//创建store
const store = configureStore(window.__INITIAL_STATE__);
//同步路由与Redux的状态
syncReduxAndRouter(history, store);
//渲染入口
ReactDOM.render
(
  <Provider store={store}>
  	<Router history={history}>
      {routes}
    </Router>
  </Provider>,
   document.getElementById('root')
);
