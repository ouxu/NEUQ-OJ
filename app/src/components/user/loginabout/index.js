import React from "react";

import {Form, Input, Button,Icon,Modal} from 'antd';
import QueueAnim from 'rc-queue-anim';


import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {login} from '../../../actions';

import goto from '../../../utils/goto';
import verify from '../../../utils/regx';
import "./index.less";

const FormItem = Form.Item;

class LoginAbout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.showModal = this.showModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.gotoRegister = this.gotoRegister.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {identifier,password}=values;
                const body = {identifier,password};
                this.props.action.login(body);
                this.setState({
                    visible: false
                });
            }
        });
        document.body.style=null; //清除无modle 回调引起的body属性改变
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

    gotoRegister(){
        this.setState({
            visible: false
        });
        goto('/register')
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <li className="nav-ul-user">
                <QueueAnim delay={150}>
                    <div className="userlogin-warp" key="userlogin-1">
                        <Button className="nav-button" onClick={this.showModal}>登录 </Button>
                        <span className="middle-warp"> | </span>
                        <Button className="nav-button" onClick={this.gotoRegister}> 注册</Button>
                    </div>
                </QueueAnim>

                <Modal title="登录NEUQ-OJ"
                       visible={this.state.visible}
                       footer={null}  //清楚脚部回调
                       onCancel={this.handleCancel}
                       width={300}
                       onOk={null}
                >
                    <div className="login-wrap">
                        <Form onSubmit={this.handleSubmit} >
                            <FormItem>
                                {getFieldDecorator('identifier', {
                                    rules: [{
                                        required: true, message: '请输入UserName/手机号/邮箱'
                                    }]
                                })(
                                    <Input addonBefore={<Icon type="user" />} placeholder="UserName/手机号/邮箱" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{
                                        pattern: verify.password, message: '请输入有效的密码(6-18位)'
                                    }, {
                                        required: true, message: '请输入密码！'
                                    }]
                                })(
                                    <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
                                )}
                            </FormItem>

                            <Button disabled={false} type="primary" htmlType="submit" id="login-btn">登录</Button>
                            <a onClick={this.gotoRegister}>注册账号</a>
                            <a className="login-form-forgot">忘记密码</a>
                        </Form>
                    </div>
                </Modal>
            </li>
        );
    }
}

const mapStateToProps=()=>{
    return{
    }
};

const mapDispatchToProps=(dispatch)=>{
    const actions = {login};
    const actionMap = {action: bindActionCreators(actions ,dispatch)}
    return actionMap;
};

let Login = Form.create()(LoginAbout);
export default connect(mapStateToProps,mapDispatchToProps)(Login);

