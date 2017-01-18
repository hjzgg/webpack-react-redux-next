/**
 * Created by Dio on 2016/4/10.
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

console.log(rootReducer)
/**
 * 配置状态容器
 * @param initialState 初始化状态
 * @returns {*}
 */
/**
 * Redux的两个核心API
 * createStore用于创建状态容器
 * combineReducers用于将多个reducers合并成一个Reducer
 */
/**
 * 状态容器三个核心方法：
 * subscribe用于监听事件，每当dispatch的时候会执行
 * dispatch用于分发action，这是改变状态容器中state的唯一途径
 * getState获取当前state
 * combineReducers用于将多个reducers合并成一个reducer函数
 * 需要注意的是合并之后每个子reducer只能处理状态容器上其对应的那部分状态
 * 比如counter这个reducer就只能修改store.getState().counter上的状态
 */
function configureStore(initialState) {
    //允许我们 dispatch() 函数,
    //Thunk middleware 并不是 Redux 处理异步 action 的唯一方式。
    const middleware = applyMiddleware(thunk);
    const createStoreWithMiddleware = compose(middleware);

    const store = createStoreWithMiddleware(createStore)(
      rootReducer, initialState
    );
    // const store = createStore(rootReducer, initialState);
    //module.hot 这个是 webpack 热加载的处理，你也可以不要它
    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });
    }
    return store;
}
module.exports = configureStore;