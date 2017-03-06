/**
 * Created by out_xu on 16/11/8.
 */
import React from "react";
import {Link} from "react-router";
import {Icon} from "antd";

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {logout,tokenVerify} from "../../../actions";
import "./index.less";
import Login from "../../user/loginabout";

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            showname: '',
            userid: ''
        };
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentWillMount() {
        if(this.props.action.tokenVerify()){
            this.setState({
                showname: localStorage.getItem('neuq_oj.name'),
                userid: localStorage.getItem('neuq_oj.id')
            })
        } else {
            this.setState({
                showname: '',
                userid:''
            })
        }
    }
    showModal() {
        this.setState({
            visible: true,
        });
    }

    handleCancel() {
        this.setState({
            visible: false,
        })
    }
    render() {
        return (
            <div id="navigation">
                <nav role='navigation'>
                    <ul>
                        <li className="othernav"><a href="#">OJ首页</a></li>
                        <li className="othernav"><a href="http://geek.acmclub.cn">极客社区</a></li>
                        <li className="othernav"><a href="http://www.acmclub.cn">ACM俱乐部</a></li>
                        {/*根据用户登录状况返回*/}
                        {(this.state.showname==='' && <Login/>) ||
                            <li className="userinfo">
                                <Link><div className = "userinfo-name"> <Icon type="user"/> {this.state.showname}</div></Link>
                                <ul>
                                    <li><Link to={`/userpage/${this.state.userid}`}><Icon type="solution"/> 个人信息</Link></li>
                                    <li><a onClick={this.props.action.logout}><Icon type="export"/> 登出</a></li>
                                </ul>
                            </li>
                        }
                    </ul>
                </nav>
            </div>
        )
    }
}

const mapStateToProps = (state)=> {
    return {
    }
};
const mapDispatchToProps = (dispatch)=> {
    const actions = {tokenVerify, logout,};
    const actionsMap = {action: bindActionCreators(actions, dispatch)};
    return actionsMap;
};
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);