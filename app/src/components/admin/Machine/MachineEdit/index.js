/**
 * Created by out_xu on 17/3/28.
 */
import React, {Component} from 'react'
import './index.less'
import moment from 'moment'
import {Button, DatePicker, Form, Input, Popconfirm, Radio, Select, Spin} from 'antd'
import {Link} from 'react-router'
import {goto, verify} from 'utils'

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group
const RangePicker = DatePicker.RangePicker
import QueueAnim from 'rc-queue-anim'

@Form.create()
class ContestEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: ''
    }
    this.passwordChange = this.passwordChange.bind(this)
  }

  passwordChange(e) {
    this.setState({
      password: e.target.value
    })
  }
  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, value) => {
      if (!err) {
        confirm({
          title: '确认提交？',
          content: '请认真审核信息，确认无错误时再提交!',
          onOk: async() => {
            await this.props.editProblem(value, this.props.params.id)
          }
        })
      }
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const title = <Input type='password' onChange={this.passwordChange} placeholder='请输入您的登录密码' size='small'/>
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
                  initialValue:  ''
                })(
                  <Input placeholder='请输入机器名称' type='textarea' autosize={{minRows: 1, maxRows: 6}}/>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label='rpc_token'
              >
                {getFieldDecorator('rpc——token', {
                  rules: [{required: true, message: '请输入机器rpc——token'}],
                  initialValue:  ''
                })(
                  <Input placeholder='请输入rpc——token' type='textarea' autosize={{minRows: 1, maxRows: 6}}/>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label='主机地址'
              >
                {getFieldDecorator('host', {
                  rules: [{required: true, message: '请输入主机地址'}],
                  initialValue:  ''
                })(
                  <Input placeholder='请输入主机地址' type='textarea'
                         autosize={{minRows: 1, maxRows: 6}}/>
                )}

              </FormItem>
              <FormItem>
                {getFieldDecorator('port', {
                  rules: [{required: true, message: '请输入主机端口'}],
                  initialValue:  ''
                })(
                  <Input placeholder='请输入主机端口' type='textarea'
                         autosize={{minRows: 1, maxRows: 6}}/>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label='status'
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
                <Button type='primary' size='large'>添加机器</Button>
              </FormItem>
            </Form>
          </div>
        </QueueAnim>
      </div>
    )
  }
}

export default ContestEdit
