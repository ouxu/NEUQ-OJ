/**
 * Created by out_xu on 17/4/23.
 */
import React, { Component } from 'react'
import { Button, Card, Form, Input } from 'antd'
import './index.less'
import QueueAnim from 'rc-queue-anim'
const FormItem = Form.Item

@Form.create()
class EditInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({
          loading: true
        })
        this.props.updateUserInfo(values)
        this.setState({
          loading: false
        })
      }
    })
  }

  render () {
    const {user: {userMe}} = this.props
    const {getFieldDecorator} = this.props.form
    const formItemLayout = {}

    return (
      <Card className='update-user-info-wrap'>
        <QueueAnim type='bottom'>
          <div className='update-user-info-header' key='update-user-info-wrap'>
            <h1 className='update-user-info-header-title'>修改用户信息</h1>
          </div>
          <div key='update-user-info-form'>
            <Form onSubmit={this.handleSubmit}>
              <FormItem
                label='用户昵称'
                {...formItemLayout}
                key='edit-info-name'
            >
                {getFieldDecorator('name', {
                  rules: [{
                    required: false
                  }],
                  initialValue: userMe.name || ''
                })(
                  <Input type='textarea' autosize placeholder='请输入用户昵称' className='update-user-info-input' />,
              )}
              </FormItem>
              <FormItem
                label='学校'
                {...formItemLayout}
                key='edit-info-school'
            >
                {getFieldDecorator('school', {
                  rules: [{
                    required: false
                  }],
                  initialValue: userMe.school || ''
                })(
                  <Input type='textarea' autosize placeholder='请输入所在学校' className='update-user-info-input' />,
              )}
              </FormItem>
              <FormItem
                label='个性签名'
                {...formItemLayout}
                key='edit-info-signature'
            >
                {getFieldDecorator('signature', {
                  rules: [{
                    required: false
                  }],
                  initialValue: userMe.signature || ''
                })(
                  <Input type='textarea' autosize placeholder='请输入个性签名' className='update-user-info-input' />,
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
          </div>
        </QueueAnim>
      </Card>
    )
  }
}
export default EditInfo
