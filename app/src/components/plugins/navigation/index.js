/**
 * Created by out_xu on 16/11/8.
 */
import React from "react";
import {Icon} from "antd";

import "./index.less";
import Login from "../../user/loginabout";
import {Link} from 'react-router';
class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentWillMount() {
        this.props.tokenVerify()
    }
    showModal() {
        this.setState({
            visible: true
        });
    }

    handleCancel() {
        this.setState({
            visible: false
        })
    }
    render() {
        const {user}=this.props;
        return (
            <div id="navigation">
                <nav role='navigation'>
                    <ul key={'navigation-'+ user.id}>
                        <li className="othernav"><a href="#">OJ首页</a></li>
                        <li className="othernav"><a href="http://geek.acmclub.cn">极客社区</a></li>
                        <li className="othernav"><a href="http://www.acmclub.cn">ACM俱乐部</a></li>
                        {/*根据用户登录状况返回*/}
                        {(user.name &&
                            <li className="userinfo">
                                <a><div className = "userinfo-name"> <Icon type="user"/> {user.name}</div></a>
                                <ul>
                                    <li><Link to={`/userpage/${user.id}`}><Icon type="solution"/> 个人信息</Link></li>
                                    <li><a onClick={this.props.logout}><Icon type="export"/> 登出</a></li>
                                </ul>
                            </li> || <Login/>
                        )}
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Navigation;