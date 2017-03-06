/**
 * Created by out_xu on 16/12/21.
 */

import React from 'react';

import {Icon,BackTop} from 'antd';

import Navigation from '../components/plugins/navigation';
import Sider from './plugins/sider';
import Footer from './plugins/footer';

// 引入标准Fetch及IE兼容依赖
import 'whatwg-fetch';
import 'es6-promise/dist/es6-promise.min.js';
import 'fetch-ie8/fetch.js';

// 引入垫片兼容IE
require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');

// Animate.CSS样式 & font-awesome样式
// 居然没有引用antd的样式文件
// import 'animate.css/animate.min.css';
import './index.less';

// 配置整体组件
class AppComponent extends React.Component {
    constructor(props){
        super(props);
        this.state={
            collapse: true
        };
        this.onCollapseChange=this.onCollapseChange.bind(this)

    }
    onCollapseChange() {
        this.setState({
            collapse: !this.state.collapse,
        })
    };

    render(){
        const collapse = this.state.collapse;
        return (
            <div className={ collapse ? "ant-layout-aside ant-layout-aside-collapse" : "ant-layout-aside"}>
                <aside className="ant-layout-sider">
                    <Sider collapse={collapse}/>
                    <div className="ant-aside-action" onClick={this.onCollapseChange}>
                        {collapse ? <Icon type="right" /> : <Icon type="left" />}
                    </div>
                </aside>
                <div className="ant-layout-main">
                    <Navigation />
                    <div className="main-content">
                        {this.props.children}
                    </div>
                    <Footer year="2017"/>
                </div>
            </div>
        );
    }
}
export default AppComponent;

