/**
 * Created by out_xu on 17/3/28.
 */
import React, {Component} from 'react'
import './index.less'
import moment from 'moment'
import {Button, DatePicker, Form, Input, Modal, Radio, Select, Spin} from 'antd'
import {Link} from 'react-router'
import {goto, verify} from 'utils'

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group
const RangePicker = DatePicker.RangePicker
import QueueAnim from 'rc-queue-anim'

const confirm = Modal.confirm

@Form.create()
class ContestEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll(async (err, value) => {
      if (!err) {
        value.is_closed = value.is_closed === '1'
        confirm({
          title: '确认生成',
          content: '请认真审核信息!',
          onOk: async () => await this.props.addJudgeServer(value)
        })

      }
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const formItemLayout = {}
    return (
      <div>
        <QueueAnim className='contest-edit' delay={100} type='bottom'>
          <div className='h-1' key='contest-edit-header'>添加机器</div>
          <div className='contest-edit-content' key='contest-edit-content'>
            <Form onSubmit={this.handleSubmit} key={'contest-edit-content-'}>
              <FormItem
                {...formItemLayout}
                label='机器名称'
              >
                {getFieldDecorator('name', {
                  rules: [{required: true, message: '请输入机器名称'}],
                  initialValue: ''
                })(
                  <Input placeholder='请输入机器名称' type='textarea' autosize={{minRows: 1, maxRows: 6}}/>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label='rpc_token'
              >
                {getFieldDecorator('rpc_token', {
                  rules: [{required: true, message: '请输入机器rpc——token'}],
                  initialValue: ''
                })(
                  <Input placeholder='请输入rpc_token' type='textarea' autosize={{minRows: 1, maxRows: 6}}/>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label='主机地址'
              >
                {getFieldDecorator('host', {
                  rules: [{required: true, message: '请输入主机地址'}],
                  initialValue: ''
                })(
                  <Input placeholder='请输入主机地址' type='textarea'
                         autosize={{minRows: 1, maxRows: 6}}/>
                )}

              </FormItem>
              <FormItem
                {...formItemLayout}
                label="主机端口"
              >
                {getFieldDecorator('port', {
                  rules: [{required: true, message: '请输入主机端口'}],
                  initialValue: ''
                })(
                  <Input placeholder='请输入主机端口' type='textarea'
                         autosize={{minRows: 1, maxRows: 6}}/>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label='启用状态'
              >
                {getFieldDecorator('status', {
                  rules: [{required: true, message: '请设置开启状态'}],
                  initialValue: ''
                })(
                  <RadioGroup>
                    <Radio value='0'>关闭</Radio>
                    <Radio value='1'>开启</Radio>
                  </RadioGroup>
                )}
              </FormItem>
              <FormItem>
                <Button type='primary' size='large' onClick={this.handleSubmit}>添加机器</Button>
              </FormItem>
            </Form>
          </div>
        </QueueAnim>
      </div>
    )
  }
}

export default ContestEdit
