/**
 * Created by out_xu on 17/4/12.
 */
import React, { Component } from 'react'
import { Card, Form, Input } from 'antd'
import './index.less'
import { verify } from '../../../utils'
const FormItem = Form.Item


@Form.create()
class ForgetPassword extends Component {

  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

      }
    })
  }

  render () {
    const {getFieldDecorator} = this.props.form
    return (
      <Card className="forget-password-wrap">
        <Form
          type="bottom"
          className="forget-password-wrap-form"
          layout="vertical"
        >
          <div className="forget-password-wrap-form-header" key="forget-password-wrap-from-header">
            <p>忘记密码</p>
          </div>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{
                pattern: verify.mail, message: '输入的不是有效的邮箱！'
              }, {
                required: true, message: '请输入邮箱!'
              }]
            })(
              <Input addonBefore="邮箱"/>
            )}
          </FormItem>
        </Form>
      </Card>
    )
  }
}

export default ForgetPassword
