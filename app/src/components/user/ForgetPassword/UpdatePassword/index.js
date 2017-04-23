/**
 * Created by out_xu on 17/4/23.
 */

import React, { Component } from 'react'
import { Button, Form, Input } from 'antd'
import { verify } from 'utils'
const FormItem = Form.Item

@Form.create()
class UpdatePassword extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.checkPassword = this.checkPassword.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({
          loading: true
        })
        const {new_password, new_password_confirmation} = values
        const params = {
          new_password,
          new_password_confirmation,
          verify_code: this.props.verifyCode
        }
        console.log(params)
        this.props.findPassword(params)
        this.setState({
          loading: false
        })
      }
    })
  }

  checkPassword (rule, value, callback) {
    const form = this.props.form
    if (value && value !== form.getFieldValue('new_password')) {
      callback('两次输入的密码不一致！')
    } else {
      callback()
    }
  }

  render () {
    const {getFieldDecorator} = this.props.form
    const formItemLayout = {}

    return (
      <Form
        onSubmit={this.handleSubmit}
        className='register-wrap-form'
      >
        <FormItem
          label='新密码'
          hasFeedback
          {...formItemLayout}
          key='register-4'
        >
          {getFieldDecorator('new_password', {
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
          {getFieldDecorator('new_password_confirmation', {
            rules: [{
              required: true, message: '与上一次密码不一致'
            }, {
              validator: this.checkPassword
            }]
          })(
            <Input type='password' />,
          )}
        </FormItem>
        <FormItem>
          <Button
            type='primary'
            htmlType='submit'
            size='large'
            loading={this.state.loading}
          >
            确认修改
          </Button>

          </FormItem>
      </Form>
    )
  }
}

export default UpdatePassword
