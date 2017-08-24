/**
 * Created by out_xu on 17/4/8.
 */
import React, { Component } from 'react'
import { Button, Col, Form, Input, InputNumber, Modal, Radio, Row } from 'antd'
import './index.less'
import QueueAnim from 'rc-queue-anim'
import { verify } from 'utils'

const confirm = Modal.confirm
const FormItem = Form.Item
const RadioGroup = Radio.Group

@Form.create()
class GroupCreate extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, value) => {
      if (!err) {
        value.is_closed = value.is_closed === '1'
        confirm({
          title: '确认创建',
          content: '请认真审核信息，一旦创建，有部分信息将无法修改!',
          onOk: async() => await this.props.createUserGroup(value)
        })
      }
    })
  }

  render () {
    const {getFieldDecorator, getFieldValue} = this.props.form
    const formItemLayout = {}
    const privacy = getFieldValue('privacy')
    const privacyDetail = () => {
      if (privacy === '1') {
        return (
          <div>
            <FormItem
              label='用户组密码'
            >
              {getFieldDecorator('password', {
                rules: [{pattern: verify.password, message: '请设置用户组密码'}],
              })(
                <Input type="password" />
              )}
            </FormItem>
          </div>
        )
      }
    }

    return (
      <QueueAnim className='group-edit' delay={100}>
        <div className='h-1' key='group-edit-header'>
          创建用户组
        </div>
        <div className='group-edit-content' key='group-edit-form'>
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
                    <InputNumber max={500} />
                  )}
                </FormItem>
              </Col>
              <Col xs={{span: 24}} sm={{span: 12}} style={{textAlign: 'left'}}>
                <FormItem>
                  <span className='ant-form-item-required span-label'>是否开放(允许新成员加入) </span>
                  {getFieldDecorator('is_closed', {
                    rules: [{required: true, message: '请选择是否允许新成员加入'}],
                  })(
                    <RadioGroup>
                      <Radio value='0'>允许</Radio>
                      <Radio value='1'>不允许</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
              </Col>
            </Row>
            <FormItem
              {...formItemLayout}
              label='用户组加密方式'
            >
              {getFieldDecorator('privacy', {
                rules: [{required: true, message: '请设置用户组加密方式'}],
              })(
                <RadioGroup>
                  <Radio value='0'>公开</Radio>
                  <Radio value='1'>加密</Radio>
                  <Radio value='2'>指定用户(请在用户组管理->用户选项卡 中添加)</Radio>
                </RadioGroup>
              )}
            </FormItem>
            {privacyDetail()}
            <FormItem>
              <Button type='primary' size='large' onClick={this.handleSubmit}>创建用户组</Button>
            </FormItem>
          </Form>
        </div>
      </QueueAnim>
    )
  }
}

export default GroupCreate
