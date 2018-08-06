import React, { Component } from  'react'
import { Form, Icon, Input, Button, Modal } from 'antd';
import './index.less'
import verify from '../../../utils/verify'

const FormItem = Form.Item;
const confirm = Modal.confirm

@Form.create()
export default class EditorCode extends Component{
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let {identifier, password} = values
        confirm({
          title: '确认重置密码',
          content: '请确认重置密码!',
          onOk: async () => await this.props.editorCode({identifier, password })
        })
      }
    });
  }
  render () {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div className='h-1'>重置密码</div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('identifier', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{pattern: verify.password,
                message: '密码长度在6-18位之间',
              },{ required: true, message: '请输入修改后的密码!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入重置密码" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              确认重置密码
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}