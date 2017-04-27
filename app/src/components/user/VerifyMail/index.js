/**
 * Created by out_xu on 17/4/17.
 */
import React, { Component } from 'react'
import { Card, message, Steps } from 'antd'
import QueueAnim from 'rc-queue-anim'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { activeUser, sendActiveMail } from 'actions'
import { goto, verify } from 'utils'
import './index.less'
import Verify from './Verify'
import Active from './Active'
const Step = Steps.Step

@connect(
  state => state.user,
  dispatch => bindActionCreators({activeUser, sendActiveMail}, dispatch),
)
class VerifyMail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      input: ''
    }
    this.onInputChange = this.onInputChange.bind(this)
    this.onVerifySubmit = this.onVerifySubmit.bind(this)
    this.onActiveSubmit = this.onActiveSubmit.bind(this)
  }

  componentDidMount () {
    if (this.props.params.vcode) {
      const params = {
        verify_code: this.props.params.vcode
      }
      this.props.activeUser(params)
    }
  }

  onInputChange (e) {
    this.setState({
      input: e.target.value
    })
  }

  onVerifySubmit () {
    const {input} = this.state
    if (input.length === 6) {
      message.success('提交成功')
      const params = {
        verify_code: input,
        user_id: this.props.userInfo.id
      }
      this.props.activeUser(params)
    } else {
      message.error('请输入有效的验证码！')
    }
  }

  onActiveSubmit () {
    const {input} = this.state
    if (input.match(verify.mail)) {
      message.success('提交成功')
      const params = {
        email: input
      }
      this.props.sendActiveMail(params)
    } else {
      message.error('请输入正确的邮箱！')
    }
  }

  render () {
    const {userInfo, route: {path}} = this.props
    const addonVerify = <div onClick={this.onVerifySubmit} className='verify-mail-input-add'>确认</div>
    const addonActive = <div onClick={this.onActiveSubmit} className='verify-mail-input-add'>确认</div>
    return (
      <Card className='verify-mail-wrap'>
        <QueueAnim type='bottom'>
          <div className='verify-mail-header' key='verify-mail-wrap'>
            <h1 className='verify-mail-header-title'>邮箱激活</h1>
          </div>
          <Steps
            current={1}
            className='verify-mail-header-step'
            key='verify-mail-header-step'
          >
            <Step title='注册' onClick={() => { goto('/register') }} />
            <Step title='激活' />
            <Step title='Done' />
          </Steps>
          {
            path === 'verify'
              ? <Verify
                email={userInfo.email}
                addonAfter={addonVerify}
                onInputChange={this.onInputChange}
            />
              : <Active
                addonAfter={addonActive}
                onInputChange={this.onInputChange}
            />
          }
        </QueueAnim>
      </Card>
    )
  }
}

export default VerifyMail
