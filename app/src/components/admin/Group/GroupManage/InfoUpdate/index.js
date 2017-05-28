/**
 * Created by out_xu on 17/5/19.
 */
import React, { Component } from 'react'
import { Button, Col, Form, Input, InputNumber, Popconfirm, Row, Switch } from 'antd'
const FormItem = Form.Item

@Form.create()
class InfoUpdate extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, value) => {
      if (!err) {
        // this.props.createUserGroup(value)
      }
    })
  }

  render () {
    const {getFieldDecorator} = this.props.form
    const formItemLayout = {}

    return (
      <Form
        onSubmit={this.handleSubmit}
        layout='vertical'
      >
        <FormItem
          {...formItemLayout}
          label='用户组名称'
        >
          {getFieldDecorator('name', {
            rules: [{required: true, message: '请输入用户组名称'}],
            initialValue: ''
          })(
            <Input placeholder='用户组名称' type='textarea' autosize={{minRows: 1, maxRows: 6}} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label='用户组描述'
        >
          {getFieldDecorator('description', {
            initialValue: ''
          })(
            <Input
              placeholder='请输入描述' type='textarea'
              autosize={{minRows: 2}}
            />
          )}

        </FormItem>

        <Row>
          <Col xs={{span: 24}} sm={{span: 12}} style={{textAlign: 'left'}}>
            <FormItem>
              <span className='ant-form-item-required span-label'>用户组最大人数 </span>
              {getFieldDecorator('max_size', {
                rules: [{
                  required: true, message: '用户组最大人数'
                }]
              })(
                <InputNumber max={300} />
              )}
            </FormItem>
          </Col>
          <Col xs={{span: 24}} sm={{span: 12}} style={{textAlign: 'left'}}>
            <FormItem>
              <span className='ant-form-item-required span-label'>是否公开 </span>
              {getFieldDecorator('is_closed', {
                initialValue: true
              })(
                <Switch defaultChecked />
              )}
            </FormItem>
          </Col>
        </Row>
        <FormItem
          {...formItemLayout}
          label='用户组密码'
        >
          {getFieldDecorator('password', {
          })(
            <Input placeholder='请输入用户组密码，不设置时任何人都可加入' />
          )}

        </FormItem>
        <FormItem>
          <Popconfirm
            title='请认真审核信息'
            onConfirm={this.handleSubmit}
            okText='Yes'
            cancelText='No'
          >
            <Button type='primary' size='large'>确认修改</Button>
          </Popconfirm>

        </FormItem>
      </Form>
    )
  }
}

export default InfoUpdate
