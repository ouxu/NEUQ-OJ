/**
 * Created by out_xu on 16/12/26.
 */
import React from 'react'
import { Button, Card, Checkbox, Col, Form, Input, Row, Tooltip } from 'antd'
import QueueAnim from 'rc-queue-anim'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { userRegister } from '../../../actions'
import API from '../../../api'
import {verify} from '../../../utils'

import './index.less'
import * as requestService from '../../../utils/request'
// TODO flex引起的字段显示不全
const FormItem = Form.Item

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => {
  const actions = {userRegister}
  return {
    action: bindActionCreators(actions, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
@Form.create()
class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      passwordDirty: false,
      checkagreement: false,
      captcha: '',
      captchastamp: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handlePasswordBlur = this.handlePasswordBlur.bind(this)
    this.checkConfirm = this.checkConfirm.bind(this)
    this.checkPassword = this.checkPassword.bind(this)
    this.checkAgreement = this.checkAgreement.bind(this)
    this.getCaptcha = this.getCaptcha.bind(this)
    this.refreshCaptcha = this.refreshCaptcha.bind(this)
  }

  componentWillMount () {
    try {
      this.getCaptcha()
    } catch (e) {

    }
  }

  async getCaptcha () {
    try {
      const data = await requestService.get(API.register)
      await this.setState({
        captcha: data.url
      })
    } catch (e) {
      console.error(e)
    }
  }

  refreshCaptcha () {
    this.setState({
      captchastamp: +new Date()
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const {name, email, mobile, password, school, password_confirmation, captcha} = values
        const body = {name, email, mobile, password, school, password_confirmation, captcha}
        this.props.action.userRegister(body)
      }
    })
  }

  handlePasswordBlur (e) {
    const value = e.target.value
    this.setState({passwordDirty: this.state.passwordDirty || !!value})
  }

  checkConfirm (rule, value, callback) {
    const form = this.props.form
    if (value && this.state.passwordDirty) {
      form.validateFields(['password_confirmation'], {force: true})
    }
    callback()
  }

  checkPassword (rule, value, callback) {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不一致！')
    } else {
      callback()
    }
  }

  checkAgreement (e) {
    this.setState({
      checkagreement: e.target.checked
    })
  }

  render () {
    const {getFieldDecorator} = this.props.form
    return (
      <Card className="register-wrap">
        <QueueAnim
          component="Form" onSubmit={this.handleSubmit} type="bottom"
          className="register-wrap-form"
        >
          <div className="register-wrap-form-header" key="register-1">
            <p>注册账号</p>
          </div>

          <FormItem
            label="用户名"
            hasFeedback
            key="register-2"
          >
            {getFieldDecorator('name', {
              rules: [{required: true, message: '请输入用户名'}]
            })(
              <Input />,
            )}
          </FormItem>
          <FormItem
            label="邮箱"
            key="register-3"
          >
            {getFieldDecorator('email', {
              rules: [{
                pattern: verify.mail, message: '输入的不是有效的邮箱！'
              }, {
                required: true, message: '请输入邮箱!'
              }]
            })(
              <Input />,
            )}
          </FormItem>
          <FormItem
            label="密码"
            hasFeedback
            key="register-4"
          >
            {getFieldDecorator('password', {
              rules: [{
                pattern: verify.password, message: '请输入6-18位有效密码！'
              }, {
                required: true, message: '请输入你的密码'
              }, {
                validator: this.checkConfirm
              }]
            })(
              <Input type="password" onBlur={this.handlePasswordBlur}/>,
            )}
          </FormItem>
          <FormItem
            label="确认密码"
            hasFeedback
            key="register-5"
          >
            {getFieldDecorator('password_confirmation', {
              rules: [{
                required: true, message: '与上一次密码不一致'
              }, {
                validator: this.checkPassword
              }]
            })(
              <Input type="password"/>,
            )}
          </FormItem>
          <FormItem
            label="手机号码"
            key="register-6"
          >
            {getFieldDecorator('mobile', {
              rules: [{
                pattern: verify.mobile, message: '请输入正确的手机号码'
              }, {
                required: true, message: '请输入你的手机号码'
              }]
            })(
              <Input />,
            )}
          </FormItem>
          <FormItem
            label="学校"
            key="register-7"
          >
            {getFieldDecorator('school', {
              rules: [{
                required: false, message: '请输入你所在的学校'
              }]
            })(
              <Input />,
            )}
          </FormItem>
          <FormItem
            label="验证码"
            // style={{ marginBottom: 10 }}
            key="register-8"
          >
            <Row type="flex">
              <Col>
                {getFieldDecorator('captcha', {
                  rules: [{required: false, message: '请输入验证码！'}]
                })(
                  <Input size="large"/>,
                )}
              </Col>
              <Col>
                <img
                  src={`${this.state.captcha}?${this.state.captchastamp}`} alt="register-captcha"
                  className="register-wrap-form-captcha" onClick={this.refreshCaptcha}
                  key={this.state.captchaflag + 1}
                />

              </Col>
            </Row>
          </FormItem>
          <Row type="flex" align="bottom" key="register-9" className="register-wrap-form-footer">
            <Col xs={{span: 24}} sm={{span: 16}}>
              <Checkbox onChange={this.checkAgreement}>我同意
                <Tooltip title="Just do it！">
                  <span className="user-should-know">《用户协议》</span>
                </Tooltip>
              </Checkbox>
            </Col>
            <Col xs={{span: 24}} sm={{span: 8}}>
              <Button
                type="primary" htmlType="submit" size="large"
                disabled={!this.state.checkagreement}
              >点击注册</Button>
            </Col>
          </Row>
        </QueueAnim>
      </Card>
    )
  }
}

export default Login

