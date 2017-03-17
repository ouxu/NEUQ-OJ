/**
 * Created by out_xu on 16/12/21.
 */
import React from "react";
import {Icon} from "antd";
import Navigation from "../components/plugins/navigation";
import Sider from "./plugins/sider";
import Footer from "./plugins/footer";
import "whatwg-fetch";
import "fetch-ie8/fetch.js";
import "./index.less";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setTimeStamp, getUserMe, logout, tokenVerify} from "../actions";
import pureRender from "../utils/pureRender";

// 引入垫片兼容IE

require('console-polyfill');
require('es6-promise');


// 配置整体组件

@pureRender
@connect(
    state => state.user,
    mapDispatchToProps
)
class AppComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: true
        };
        this.onCollapseChange = this.onCollapseChange.bind(this);

    }

    componentDidMount() {
        this.props.action.getUserMe();
    }

    onCollapseChange() {
        this.setState({
            collapse: !this.state.collapse
        });
    }

    render() {
        const collapse = this.state.collapse;
        const {userinfo}= this.props;
        return (
            <div className={collapse ? 'ant-layout-aside ant-layout-aside-collapse' : 'ant-layout-aside'}>
                <aside className="ant-layout-sider">
                    <Sider collapse={collapse}/>
                    <div className="ant-aside-action" onClick={this.onCollapseChange}>
                        {collapse ? <Icon type="right"/> : <Icon type="left"/>}
                    </div>
                </aside>
                <div className="ant-layout-main">
                    <Navigation
                        user={userinfo}
                        logout={this.props.action.logout}
                        tokenVerify={this.props.action.tokenVerify}
                    />
                    <div className="main-content">
                        {this.props.children}
                    </div>
                    <Footer year="2017"/>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};


const mapDispatchToProps = (dispatch) => {
    const actions = {setTimeStamp, getUserMe, logout, tokenVerify};
    return {
        action: bindActionCreators(actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);

