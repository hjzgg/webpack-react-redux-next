import React, {Component} from 'react';
/**
 * 异步的加载组件
 */
var asyncLoader = function(component){
    return React.createClass({
        getInitialState() {
            return {
                Component: null
            }
        },
        componentDidMount() {
            //模拟出loading的效果
            // setTimeout(() => {
            //   component((Component) => {
            //     this.setState({
            //       Component: Component
            //     });
            //   });
            // }, 3000);
            component((Component) => {
                this.setState({
                    Component: Component
                });
            });
        },
        render() {
            var Component = this.state.Component;
            if (Component) {
                return <Component {... this.props}/>
            } else {
                //return <div>Loading...</div>;
                return <div></div>;
            }
        }
    });
};
module.exports = asyncLoader;