/**
 * Created by out_xu on 17/4/12.
 */
import React, { Component } from 'react'
import { Card, Steps } from 'antd'
import './index.less'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { findPassword, forgotPassword } from 'actions'
import QueueAnim from 'rc-queue-anim'

import StepContent from './StepContent'
import UpdatePassword from './UpdatePassword'
const Step = Steps.Step

@connect(
  state => ({}),
  dispatch => bindActionCreators({forgotPassword, findPassword}, dispatch)
)
class ForgetPassword extends Component {
  constructor (props) {
    super(props)
    this.state = {
      input: ''
    }
    this.onInputChange = this.onInputChange.bind(this)
    this.sendVerifyMail = this.sendVerifyMail.bind(this)
  }

  sendVerifyMail (e) {
    e.preventDefault()
    this.props.forgotPassword({email: this.state.input})
  }

  onInputChange (e) {
    this.setState({
      input: e.target.value
    })
  }

  render () {
    const {params: {type}, findPassword} = this.props
    const current = {
      'succ': 0,
      'update': 1,
      'done': 2
    }
    const addonAfter = <div onClick={this.sendVerifyMail} className='verify-mail-input-add'>确认</div>
    return (
      <Card className='forget-password-wrap'>
        <QueueAnim type='bottom'>
          <div className='forget-password-header' key='forget-password-wrap'>
            <h1 className='forget-password-header-title'>找回密码</h1>
          </div>
          <Steps
            current={current[type] || 0}
            className='forget-password-header-step'
            key='forget-password-header-step'
          >
            <Step title='验证' />
            <Step title='修改密码' />
            <Step title='Done' />
          </Steps>
          <StepContent
            type={type}
            addonAfter={addonAfter}
            onInputChange={this.onInputChange}
          />
          {
            type && type.length > 10 &&
            <UpdatePassword
              verifyCode={type}
              findPassword={findPassword}
            />
          }
        </QueueAnim>
      </Card>
    )
  }
}

export default ForgetPassword
