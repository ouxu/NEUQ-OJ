/**
 * Created by out_xu on 17/5/19.
 */
import React, { Component } from 'react'
import { Button, Col, Form, Input, InputNumber, Popconfirm, Radio, Row } from 'antd'
import { verify } from 'utils'
const FormItem = Form.Item
const RadioGroup = Radio.Group
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
        value.is_closed = value.is_closed === '1'
        this.props.updateGroupInfo(this.props.gid, value)
        this.props.getGroupInfo(this.props.gid)
      }
    })
  }

  render () {
    const {getFieldDecorator, getFieldValue} = this.props.form
    const {groupInfo} = this.props

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
                initialValue: groupInfo.password || ''
              })(
                <Input type="password" />
              )}
            </FormItem>
          </div>
        )
      }
    }
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
            initialValue: groupInfo.name || ''
          })(
            <Input placeholder='用户组名称' type='textarea' autosize={{minRows: 1, maxRows: 6}} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label='用户组描述'
        >
          {getFieldDecorator('description', {
            initialValue: groupInfo.description || ''
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
                  required: true, message: '用户组最大人数',
                }],
                initialValue: groupInfo.max_size || 0
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
                initialValue: groupInfo.is_closed + '' || '0'
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
            initialValue: '' + groupInfo.privacy || '1'
          })(
            <RadioGroup>
              <Radio value='0'>公开</Radio>
              <Radio value='1'>加密</Radio>
              <Radio value='2'>指定用户</Radio>
            </RadioGroup>
          )}
        </FormItem>
        {privacyDetail()}
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
