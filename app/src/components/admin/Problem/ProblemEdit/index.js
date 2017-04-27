/**
 * Created by out_xu on 17/4/8.
 */
import React, { Component } from 'react'

import { Button, Col, Form, Input, InputNumber, Popconfirm, Radio, Row, Spin, Switch } from 'antd'

import { Link } from 'react-router'
import './index.less'

const FormItem = Form.Item
const RadioGroup = Radio.Group

@Form.create()
class ProblemEdit extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, value) => {
      if (!err) {
        this.props.editProblem(value, this.props.id)
      }
    })
  }

  render () {
    const {id, loading, data} = this.props

    const {getFieldDecorator} = this.props.form
    const formItemLayout = {}
    return (
      <Spin tip='loading' spinning={loading} key={id}>
        <div className='problem-edit'>
          <div className='h-1'>
            {id ? <span><Link to='admin/contest-list'>修改题目</Link> #{id}</span> : '添加题目'}
          </div>
          <div className='problem-edit-content'>
            <Form
              onSubmit={this.handleSubmit}
              layout='vertical'
            >
              <FormItem
                {...formItemLayout}
                label='标题'
              >
                {getFieldDecorator('title', {
                  rules: [{required: true, message: '请输入标题'}],
                  initialValue: data['title'] ? data.title : ''
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
                  initialValue: data['title'] ? data.description : ''
                })(
                  <Input
                    placeholder='请输入描述，支持 Markdown 语法，请在 Markdown 编辑器中编辑后粘贴' type='textarea'
                    autosize={{minRows: 2}}
                  />
                )}

              </FormItem>

              <FormItem
                {...formItemLayout}
                label='描述输入'
              >
                {getFieldDecorator('input', {
                  rules: [{required: true, message: '请描述输入'}],
                  initialValue: data['title'] ? data.sample_input : ''
                })(
                  <Input
                    placeholder='描述所需的输入格式和内容' type='textarea'
                    autosize={{minRows: 2}}
                  />
                )}

              </FormItem>
              <FormItem
                {...formItemLayout}
                label='描述输出'
              >
                {getFieldDecorator('output', {
                  rules: [{required: true, message: '请描述输出'}],
                  initialValue: data['title'] ? data.sample_output : ''
                })(
                  <Input
                    placeholder='描述所需的输出格式和内容' type='textarea'
                    autosize={{minRows: 2}}
                  />
                )}

              </FormItem>

              <FormItem>
                <span className='ant-form-item-required span-label'>难度</span>
                {getFieldDecorator('difficulty', {
                  rules: [{required: true, message: '请设置题目难度'}],
                  initialValue: !!data['title'] && data.difficulty + ''
                })(
                  <RadioGroup>
                    <Radio value='1'>简单</Radio>
                    <Radio value='2'>一般</Radio>
                    <Radio value='3'>困难</Radio>
                  </RadioGroup>
                )}
              </FormItem>
              <Row>
                <Col xs={{span: 24}} sm={{span: 12}} style={{textAlign: 'left'}}>
                  <FormItem>
                    <span className='ant-form-item-required span-label'>是否公开 </span>
                    {getFieldDecorator('is_public', {
                      rules: [{required: true, message: '请选择是否公开题目'}],
                      initialValue: data['is_public'] ? data.is_public : true
                    })(
                      <Switch defaultChecked={data['is_public'] ? data.is_public : true} />
                    )}
                  </FormItem>
                </Col>
                <Col xs={{span: 24}} sm={{span: 12}} style={{textAlign: 'left'}}>
                  <FormItem>
                    <span className='ant-form-item-required span-label'>是否特判 </span>
                    {getFieldDecorator('spj', {
                      rules: [{required: true, message: '请选择是否特判'}],
                      initialValue: data['spj'] ? data.spj : false
                    })(
                      <Switch defaultChecked={data['spj'] ? data.spj : false} />
                    )}
                  </FormItem>
                </Col>
              </Row>

              <Row>
                <Col xs={{span: 24}} sm={{span: 12}} style={{textAlign: 'left'}}>
                  <FormItem>
                    <span className='ant-form-item-required span-label'>时间限制 </span>
                    {getFieldDecorator('time_limit', {
                      rules: [{required: true, message: '请设置题目时间限制'}],
                      initialValue: data['title'] ? data.time_limit : null
                    })(
                      <InputNumber max={512} />
                    )}
                    <span className='ant-form-text'> S</span>
                  </FormItem>

                </Col>
                <Col xs={{span: 24}} sm={{span: 12}} style={{textAlign: 'left'}}>
                  <FormItem>
                    <span className='ant-form-item-required span-label'>内存限制 </span>
                    {getFieldDecorator('memory_limit', {
                      rules: [{required: true, message: '请设置题目时间限制'}],
                      initialValue: data['title'] ? data.memory_limit : null
                    })(
                      <InputNumber max={512} />
                    )}
                    <span className='ant-form-text'> MByte</span>
                  </FormItem>
                </Col>

              </Row>

              <FormItem
                {...formItemLayout}
                label='样例输入'
              >
                {getFieldDecorator('sample_input', {
                  rules: [{required: false, message: '请输入样例输入'}],
                  initialValue: data['title'] ? data.sample_input : ''
                })(
                  <Input placeholder='用于前台展示的样例输入' type='textarea'
                    autosize={{minRows: 2}} />
                )}

              </FormItem>
              <FormItem
                {...formItemLayout}
                label='样例输出'
              >
                {getFieldDecorator('sample_output', {
                  rules: [{required: true, message: '请输入样例输出'}],
                  initialValue: data['title'] ? data.sample_output : ''
                })(
                  <Input placeholder='用于前台展示的样例输出' type='textarea'
                    autosize={{minRows: 2}} />
                )}

              </FormItem>
              <FormItem
                {...formItemLayout}
                label='测试输入'
              >
                {getFieldDecorator('test_input', {
                  rules: [{required: false, message: '请输入测试输入'}],
                  initialValue: data['title'] ? data.test_input : ''
                })(
                  <Input placeholder='用于判题的样例输入' type='textarea'
                    autosize={{minRows: 2}} />
                )}

              </FormItem>
              <FormItem
                {...formItemLayout}
                label='测试输出'
              >
                {getFieldDecorator('test_output', {
                  rules: [{required: true, message: '请输入测试输出'}],
                  initialValue: data['title'] ? data.test_output : ''
                })(
                  <Input placeholder='用于判题的样例输出' type='textarea'
                    autosize={{minRows: 2}} />
                )}

              </FormItem>
              <FormItem
                {...formItemLayout}
                label='来源'
              >
                {getFieldDecorator('source', {
                  rules: [{required: false, message: '可输入来源'}],
                  initialValue: data['title'] ? data.hint : ''
                })(
                  <Input placeholder='可输入来源' type='textarea'
                    autosize={{minRows: 1}} />
                )}

              </FormItem>
              <FormItem
                {...formItemLayout}
                label='提示'
              >
                {getFieldDecorator('hint', {
                  rules: [{required: false, message: '请输入提示'}],
                  initialValue: data['title'] ? data.hint : ''
                })(
                  <Input placeholder='可输入提示' type='textarea'
                    autosize={{minRows: 1}} />
                )}

              </FormItem>

              <FormItem>
                {
                  id
                    ? <Popconfirm title='你确定要修改本题目吗？'
                      onConfirm={this.handleSubmit}
                      okText='Yes'
                      cancelText='No'
                  >
                      <Button className='contest-edit-submit' size='large' type='primary'>
                        修改题目
                      </Button>
                    </Popconfirm>
                    : <Popconfirm title='请认真审核信息'
                      onConfirm={this.handleSubmit}
                      okText='Yes'
                      cancelText='No'
                  >
                      <Button type='primary' size='large'>添加题目</Button>
                    </Popconfirm>
                }
                {
                  id &&
                  <Popconfirm title='你确定要删除本题目吗？'
                    onConfirm={this.onConfirmDel}
                    okText='Yes'
                    cancelText='No'
                  >
                    <Button type='danger' size='large'>删除题目</Button>
                  </Popconfirm>
                }
              </FormItem>
            </Form>
          </div>
        </div>
      </Spin>
    )
  }
}

export default ProblemEdit
