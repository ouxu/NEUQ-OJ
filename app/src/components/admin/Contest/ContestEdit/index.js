/**
 * Created by out_xu on 17/3/28.
 */
import React, { Component } from 'react'
import './index.less'
import moment from 'moment'
import { Button, DatePicker, Form, Input, Modal, Radio, Select, Spin } from 'antd'
import { Link } from 'react-router'
import { goto, verify } from 'utils'
import QueueAnim from 'rc-queue-anim'
const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group
const RangePicker = DatePicker.RangePicker
const confirm = Modal.confirm

@Form.create()
class ContestEdit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.checkPrivate = this.checkPrivate.bind(this)
    this.onConfirmDel = this.onConfirmDel.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        confirm({
          title: '请认真审核信息，确认无错误时再提交!',
          content: (
            <Input
              type='password'
              onChange={(e) => this.setState({password: e.target.value})}
              placeholder='请输入您的登录密码'
            />
          ),
          onOk: () => {
            const rangeTimeValue = fieldsValue['range-time-picker']
            let values = {
              'title': fieldsValue.title,
              'private': fieldsValue.privated,
              'password': fieldsValue.password,
              'langmask': fieldsValue.langmask.map((t) => +t),
              'problems': fieldsValue.problems.map((t) => +t),
              'description': fieldsValue.description,
              'user_password': this.state.password
            }
            if (fieldsValue.users) {
              values = {
                ...values,
                users: fieldsValue.users.map((t) => +t)
              }
            }
            if (rangeTimeValue) {
              if (rangeTimeValue.length > 1) {
                values = {
                  ...values,
                  'start_time': rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
                  'end_time': rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss')
                }
              } else {
                values = {
                  ...values,
                  'end_time': rangeTimeValue.format('YYYY-MM-DD HH:mm:ss')
                }
              }
            }
            let problemParams = {
              'password': this.state.password,
              'problem_ids': fieldsValue.problems.map((t) => +t)
            }

            try {
              if (this.props.cid){
                this.props.updateContestProblems(this.props.cid, problemParams)
              } else {
                this.props.editContest(values, this.props.cid)
              }
              goto('/admin/contest-list')
            } catch (e) {
              console.log(e)
            }
          }
        })
      }
    })
  }

  onConfirmDel () {
    confirm({
      title: '是否决定要删除?',
      content: (
        <Input
          type='password'
          onChange={(e) => this.setState({password: e.target.value})}
          placeholder='请输入您的登录密码'
        />
      ),
      onOk: () => {
        this.props.delContest(this.props.cid, {password: this.state.password})
        goto('/admin/contest-list')
      }
    })
  }

  checkPrivate () {
    const form = this.props.form
    return +form.getFieldValue('privated')
  }

  render () {
    const {getFieldDecorator} = this.props.form
    let {contest: {problems = [], progress, contest_info = {langmask: []}, problems_info = [], user_ids}, loading, cid} = this.props

    const formItemLayout = {}

    problems = problems.map((t) => '' + t)
    problems_info.forEach((t) => {
      problems.push('' + t.problem_id)
    })
    return (
      <Spin tip='Loading...' spinning={loading}>
        <QueueAnim className='contest-edit' delay={100} type='bottom'>
          <div className='h-1' key='contest-edit-header'>
            {cid ? <span><Link to='/admin/contest-list'>修改竞赛</Link> #{cid}</span> : '添加竞赛'}
          </div>
          <div className='contest-edit-content' key='contest-edit-content'>
            <Form onSubmit={this.handleSubmit} key={'contest-edit-content-' + cid}>
              <FormItem
                {...formItemLayout}
                label='标题'
              >
                {getFieldDecorator('title', {
                  rules: [{required: true, message: '请输入标题'}],
                  initialValue: contest_info.title || ''
                })(
                  <Input placeholder='请输入标题' type='textarea' autosize={{minRows: 1, maxRows: 6}} />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label='描述'
              >
                {getFieldDecorator('description', {
                  rules: [{required: true, message: '请输入描述'}],
                  initialValue: contest_info.description || ''
                })(
                  <Input placeholder='请输入描述，支持 Markdown 语法，请在 Markdown 编辑器中编辑后粘贴' type='textarea'
                    autosize={{minRows: 2}} />
                )}

              </FormItem>
              {
                (progress === 'unStart' || !cid) &&
                <FormItem
                  {...formItemLayout}
                  label='时间'
                >
                  {getFieldDecorator('range-time-picker', {
                    rules: [{type: 'array', required: true, message: '请选择时间'}],
                    initialValue: cid ? [
                      moment(contest_info.start_time, 'YYYY-MM-DD HH:mm:ss'),
                      moment(contest_info.end_time, 'YYYY-MM-DD HH:mm:ss')
                    ] : []
                  })(
                    <RangePicker showTime format='YYYY-MM-DD HH:mm:ss' />
                  )}
                </FormItem>
              }
              {
                progress && progress !== 'unStart' &&
                <FormItem
                  {...formItemLayout}
                  label='结束时间'
                >
                  {getFieldDecorator('range-time-picker', {
                    rules: [{required: true, message: '请选择时间'}],
                    initialValue: cid ? moment(contest_info.end_time, 'YYYY-MM-DD HH:mm:ss') : null
                  })(
                    <DatePicker showTime format='YYYY-MM-DD HH:mm:ss' />
                  )}
                </FormItem>
              }
              <FormItem
                {...formItemLayout}
                label='权限'
              >
                {getFieldDecorator('privated', {
                  rules: [{required: true, message: '请设置竞赛状态'}],
                  initialValue: contest_info.private + ''
                })(
                  <RadioGroup>
                    <Radio value='0'>公开</Radio>
                    <Radio value='1'>加密</Radio>
                    <Radio value='2'>私有</Radio>
                  </RadioGroup>
                )}
              </FormItem>
              {
                this.checkPrivate() === 1 &&
                <FormItem
                  {...formItemLayout}
                  label='加密密码'
                >
                  {getFieldDecorator('password', {
                    rules: [{
                      pattern: verify.password, message: '请输入有效的密码(6-18位)'
                    }, {
                      required: true, message: '请输入加密密码'
                    }]
                  })(
                    <Input placeholder='请输入加密密码' />
                  )}

                </FormItem>
              }

              <FormItem
                {...formItemLayout}
                label='语言'
              >
                {getFieldDecorator('langmask', {
                  rules: [{type: 'array'}],
                  initialValue: contest_info.langmask.map((t) => t + '') || []
                })(
                  <Select mode='multiple' placeholder='请选择支持语言'>
                    <Option value='0'>C</Option>
                    <Option value='1'>C++</Option>
                    {/*<Option value='2'>Pascal</Option>*/}
                    <Option value='2'>Java</Option>
                    {/*<Option value='4'>Ruby</Option>*/}
                    {/*<Option value='5'>Shell</Option>*/}
                    <Option value='3'>Python</Option>
                    {/*<Option value='7'>php</Option>*/}
                    {/*<Option value='9'>perl</Option>*/}
                  </Select>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label='题目'
              >
                {getFieldDecorator('problems', {
                  rules: [{type: 'array'}],
                  initialValue: problems || []
                })(
                  <Select
                    mode='tags'
                    tokenSeparators={[' ']}
                    notFoundContent='可在 Excel 中复制后直接粘贴'
                  />
                )}
              </FormItem>
              {
                this.checkPrivate() === 2 &&
                <FormItem
                  {...formItemLayout}
                  label='用户'
                >
                  {getFieldDecorator('users', {
                    rules: [{type: 'array'}],
                    initialValue: user_ids ? user_ids.map((t) => t.user_id) : []
                  })(
                    <Select
                      mode='tags'
                      tokenSeparators={[' ']}
                      notFoundContent='可在 Excel 中复制后直接粘贴'
                    />
                  )}
                </FormItem>
              }
              <FormItem>
                {
                  cid ? (
                    <Button className='contest-edit-submit' size='large' type='primary' onClick={this.handleSubmit}>
                      修改竞赛
                    </Button>
                  ) : (
                    <Button type='primary' size='large' onClick={this.handleSubmit}>添加竞赛</Button>
                  )
                }
                {
                  cid && <Button type='danger' size='large' onClick={this.onConfirmDel}>删除竞赛</Button>

                }
              </FormItem>
            </Form>
          </div>
        </QueueAnim>
      </Spin>
    )
  }
}

export default ContestEdit
