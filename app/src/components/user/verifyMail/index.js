/**
 * Created by out_xu on 17/4/17.
 */
import React, { Component } from 'react'
import { Card, message, Steps } from 'antd'
import QueueAnim from 'rc-queue-anim'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ActiveUser } from '../../../actions'
import { goto } from '../../../utils'
import './index.less'
import Verify from './verify'
import Active from './active'
const Step = Steps.Step;

@connect(
  state => state.user,
  dispatch => bindActionCreators({ActiveUser}, dispatch),
)
class VerifyMail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      verify_code: '',
    }
    this.onInputChange = this.onInputChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onInputChange (e) {
    this.setState({
      verify_code: e.target.value,
    })
  }

  onSubmit () {
    const {verify_code} = this.state
    if (verify_code.length === 6) {
      message.success("提交成功")
      const params = {
        verify_code: verify_code,
        user_id: this.props.userinfo.id
      }
      this.props.ActiveUser(params)
    } else {
      message.error("请输入有效的验证码")
    }
  }

  render () {
    const {userinfo, route: {path}} = this.props
    const addonAfter = <div onClick={this.onSubmit} className="verify-mail-input-add">
      确认
    </div>
    return (
      <Card className="verify-mail-wrap">
        <QueueAnim type="bottom">
          <div className="verify-mail-header" key="verify-mail-wrap">
            <h1 className="verify-mail-header-title">邮箱激活</h1>
          </div>
          <Steps
            current={1}
            className="verify-mail-header-step"
            key="verify-mail-header-step"
          >
            <Step title="注册" onClick={() => {goto('/register')}}/>
            <Step title="激活"/>
            <Step title="Done"/>
          </Steps>
          {
            path === 'verify' ?
              <Verify
                email={userinfo.email}
                addonAfter={addonAfter}
                onInputChange={this.onInputChange}
              /> :
              <Active
                addonAfter={addonAfter}
                onInputChange={this.onInputChange}
              />
          }

        </QueueAnim>
      </Card>
    );
  }
}

export default VerifyMail;
