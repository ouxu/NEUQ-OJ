/**
 * Created by out_xu on 17/4/12.
 */
import React, { Component } from 'react'
import { Card } from 'antd'

class ForgetPassword extends Component {
  render () {
    return (
      <Card className="register-wrap">
        <QueueAnim
          component="Form" onSubmit={this.handleSubmit} type="bottom"
          className="register-wrap-form"
        >
          <div className="register-wrap-form-header" key="register-1">
            <p>注册账号</p>
          </div>
        </QueueAnim>
      </Card>
    );
  }
}

export default ForgetPassword;
