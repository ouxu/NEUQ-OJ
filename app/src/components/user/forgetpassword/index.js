/**
 * Created by out_xu on 17/4/12.
 */
import React, { Component } from 'react'
import { Card, Form, Steps } from 'antd'
import './index.less'
import QueueAnim from 'rc-queue-anim'
import { goto } from '../../../utils'
const Step = Steps.Step

@Form.create()
class ForgetPassword extends Component {
  handleSubmit (e) {
    e.preventDefault()
  }

  render () {
    return (
      <Card className='forget-password-wrap'>
        <QueueAnim type='bottom'>
          <div className='forget-password-header' key='forget-password-wrap'>
            <h1 className='forget-password-header-title'>找回密码</h1>
          </div>
          <Steps
            current={1}
            className='forget-password-header-step'
            key='forget-password-header-step'
          >
            <Step title='注册' onClick={() => { goto('/register') }}/>
            <Step title='激活'/>
            <Step title='Done'/>
          </Steps>

        </QueueAnim>
      </Card>
    )
  }
}

export default ForgetPassword
