/**
 * Created by out_xu on 16/12/21.
 */
import React from "react";
import {Icon} from "antd";
import Navigation from "../container/navigation";
import Sider from "./plugins/sider";
import Footer from "./plugins/footer";
import "whatwg-fetch";
import "fetch-ie8/fetch.js";
import "./index.less";
import pureRender from "../utils/pureRender";

require('console-polyfill');
require('es6-promise');


// 配置整体组件



class AppComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: true
        };
        this.onCollapseChange = this.onCollapseChange.bind(this);

    }

    componentDidMount() {
    }

    onCollapseChange() {
        this.setState({
            collapse: !this.state.collapse
        });
    }

    render() {
        const collapse = this.state.collapse;
        return (
            <div className={collapse ? 'ant-layout-aside ant-layout-aside-collapse' : 'ant-layout-aside'}>
                <aside className="ant-layout-sider">
                    <Sider collapse={collapse}/>
                    <div className="ant-aside-action" onClick={this.onCollapseChange}>
                        {collapse ? <Icon type="right"/> : <Icon type="left"/>}
                    </div>
                </aside>
                <div className="ant-layout-main">
                    <Navigation/>
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

