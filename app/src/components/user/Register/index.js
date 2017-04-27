/**
 * Created by out_xu on 16/12/26.
 */
import React from 'react'
import { Button, Card, Checkbox, Col, Form, Icon, Input, Row, Steps, Tooltip } from 'antd'
import { Link } from 'react-router'
import QueueAnim from 'rc-queue-anim'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { userRegister } from 'actions'
import API from 'api'
import { verify } from 'utils'
import * as requestService from 'utils/request'

import './index.less'

const FormItem = Form.Item
const Step = Steps.Step
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
      checkAgreement: false,
      captcha: '',
      captchaStamp: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handlePasswordBlur = this.handlePasswordBlur.bind(this)
    this.checkPassword = this.checkPassword.bind(this)
    this.checkAgreement = this.checkAgreement.bind(this)
    this.getCaptcha = this.getCaptcha.bind(this)
    this.refreshCaptcha = this.refreshCaptcha.bind(this)
  }

  componentDidMount () {
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
      checkAgreement: e.target.checked
    })
  }

  render () {
    const {getFieldDecorator} = this.props.form
    const formItemLayout = {}
    return (
      <Card className='register-wrap'>
        <QueueAnim type='bottom'>
          <div className='register-wrap-header' key='register-wrap-header'>
            <h1 className='register-wrap-header-title'>注册账号</h1>
            <Link to='/register/active' className='register-wrap-header-active'>
              <Icon type='info-circle-o' /> 已有账号，点此激活
            </Link>
          </div>
          <Steps
            current={0}
            className='register-wrap-step'
            key='register-wrapr-step'
          >
            <Step title='注册' />
            <Step
              title={
                <Tooltip title='已有账号，点此激活'>
                  <Link to='/register/active'>激活</Link>
                </Tooltip>
              }
            />
            <Step title='Done' />
          </Steps>
          <QueueAnim onSubmit={this.handleSubmit}
            className='register-wrap-form'
            component='Form'
            type='bottom'
          >
            <FormItem
              label='用户名'
              hasFeedback
              {...formItemLayout}
              key='register-2'
            >
              {getFieldDecorator('name', {
                rules: [{required: true, message: '请输入用户名'}]
              })(
                <Input />,
              )}
            </FormItem>

            <FormItem
              label='邮箱'
              {...formItemLayout}
              key='register-3'
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
              label='密码'
              hasFeedback
              {...formItemLayout}
              key='register-4'
            >
              {getFieldDecorator('password', {
                rules: [{
                  pattern: verify.password, message: '请输入6-18位有效密码！'
                }, {
                  required: true, message: '请输入你的密码'
                }]
              })(
                <Input type='password' onBlur={this.handlePasswordBlur} />,
              )}
            </FormItem>
            <FormItem
              label='确认密码'
              hasFeedback
              {...formItemLayout}
              key='register-5'
            >
              {getFieldDecorator('password_confirmation', {
                rules: [{
                  required: true, message: '与上一次密码不一致'
                }, {
                  validator: this.checkPassword
                }]
              })(
                <Input type='password' />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label='手机号码'
              key='register-6'
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
              {...formItemLayout}
              label='学校'
              key='register-7'
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
              label='验证码'
              key='register-8'
            >
              <Row type='flex'>
                <Col>
                  {getFieldDecorator('captcha', {
                    rules: [{required: false, message: '请输入验证码！'}]
                  })(
                    <Input size='large' />,
                  )}
                </Col>
                <Col>
                  <img
                    src={`${this.state.captcha}?${this.state.captchastamp}`} alt='register-captcha'
                    className='register-wrap-form-captcha' onClick={this.refreshCaptcha}
                    key={this.state.captchaflag + 1}
                  />

                </Col>
              </Row>
            </FormItem>
            <FormItem>
              <Row type='flex' align='bottom' key='register-9' className='register-wrap-form-footer'>
                <Col xs={{span: 24}} sm={{span: 12}}>
                  <Checkbox onChange={this.checkAgreement}>我同意
                    <Tooltip title='Just do it！'>
                      <span className='user-should-know'>《用户协议》</span>
                    </Tooltip>
                  </Checkbox>
                </Col>
                <Col xs={{span: 24}} sm={{span: 12}}>
                  <Button
                    type='primary' htmlType='submit' size='large'
                    disabled={!this.state.checkAgreement}
                  >点击注册</Button>
                </Col>
              </Row>
            </FormItem>
          </QueueAnim>
        </QueueAnim>
      </Card>
    )
  }
}

export default Login
