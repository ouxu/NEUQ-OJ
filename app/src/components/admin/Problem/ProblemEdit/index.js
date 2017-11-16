/**
 * Created by out_xu on 17/4/8.
 */
import React, { Component } from 'react'

import { Button, Col, Form, Icon, Input, InputNumber, Modal, Radio, Row, Spin, Switch, Tag } from 'antd'

import { Link } from 'react-router'
import QueueAnim from 'rc-queue-anim'
import { goto } from 'utils'
import './index.less'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const confirm = Modal.confirm

// TODO 描述输出修改无效

let uuid = 0

@Form.create()
class ProblemEdit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }

  componentDidMount () {
    this.props.params.id ? this.props.getProblemInfo(this.props.params) : this.props.clearProblem()
  }

  handleChange (e) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll(async (err, value) => {
      if (!err) {
        let input = []
        let output = []
        Object.keys(value).forEach(key => {
          if (key.match(/^test_output?/)) {
            output.push(value[key])
          }
          if (key.match(/^test_input?/)) {
            input.push(value[key])
          }
        })
        let test_data = []
        for (let i = 0; i < input.length; i++) {
          let item = {
            input: input[i],
            output: output[i]
          }
          test_data.push(item)
        }
        const {title, description, sample_input, sample_output, difficulty, source, time_limit, memory_limit, spj, is_public, hint} = value
        const body = {
          title: title,
          input: value.input,
          output: value.output,
          description: description,
          sample_input: sample_input,
          sample_output: sample_output,
          difficulty: difficulty,
          source: source,
          time_limit: time_limit,
          memory_limit: memory_limit,
          spj: spj,
          is_public: is_public,
          hint: hint,
          test_data: test_data
        }
        console.log(JSON.stringify(body))
        const id = this.props.params.id
        await this.props.changeProblem(id, body)
        await this.props.getProblemInfo(this.props.params)
      }
    })
  }

  handleAdd (e) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, value) => {
      if (!err) {
        confirm({
          title: '确认提交？',
          content: '请认真审核信息，确认无错误时再提交!',
          onOk: async () => {
            let input = []
            let output = []
            Object.keys(value).forEach(key => {
              if (key.match(/^test_output?/)) {
                output.push(value[key])
              }
              if (key.match(/^test_input?/)) {
                input.push(value[key])
              }
            })
            let test_data = []
            for (let i = 0; i < input.length; i++) {
              let item = {
                input: input[i],
                output: output[i]
              }
              test_data.push(item)
            }
            const {title, description, sample_input, sample_output, difficulty, source, time_limit, memory_limit, spj, is_public, hint} = value
            const body = {
              title: title,
              input: value.input,
              output: value.output,
              description: description,
              sample_input: sample_input,
              sample_output: sample_output,
              difficulty: difficulty,
              source: source,
              time_limit: time_limit,
              memory_limit: memory_limit,
              spj: spj,
              is_public: is_public,
              hint: hint,
              test_data: test_data
            }
            console.log(body)
            await this.props.createProblems(body)
          }
        })
      }
    })
  }

  onConfirmDel = (e) => {
    e.preventDefault()
    confirm({
      title: '是否决定要删除?删除后无法恢复！',
      content: (
        <Input
          type='password'
          onChange={(e) => this.setState({password: e.target.value})}
          placeholder='请输入您的登录密码'
        />
      ),
      onOk: async () => {
        await this.props.deleteProblem(this.props.params.id, {password: this.state.password})
        goto('admin/problem-list')
      }
    })
  }

  add = () => {
    uuid++
    const {form} = this.props
    // can use data-binding to get
    const keys = form.getFieldValue('keys')
    const nextKeys = keys.concat(uuid)
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    })
  }

  remove = (k) => {
    const {form} = this.props
    // can use data-binding to get
    const keys = form.getFieldValue('keys')
    // We need at least one passenger
    if (keys.length === 0) {
      return
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    })
  }

  render () {
    const {problems: {problemDetail: data}, params: {id}, loading} = this.props
    const {getFieldDecorator} = this.props.form
    const formItemLayout = {}

    const {getFieldValue} = this.props.form
    getFieldDecorator('keys', {initialValue: []})
    const keys = getFieldValue('keys')
    const formItems = keys.map((k, index) => {
      console.log(k)
      return (
        <div key={k}>
          <hr style={{border: '1px solid #E0E0E0'}} />
          <br />
          <FormItem
            {...formItemLayout}
            label={'测试输入 ' + (index + 2)}
            key={'test-input' + (k + 2)}
          >
            {getFieldDecorator('test_input#' + (k + 2), {
              rules: [{required: false, message: '请输入测试输入'}],
              initialValue: data['title'] ? data.test_input : ''
            })(
              <Input placeholder='用于判题的样例输入' type='textarea'
                autosize={{minRows: 2}} />
            )}

          </FormItem>
          <FormItem
            {...formItemLayout}
            label={'测试输出 ' + (index + 2)}
            key={'test-output' + (k + 2)}
          >
            {getFieldDecorator('test_output#' + (k + 2), {
              rules: [{required: true, message: '请输入测试输出'}],
              initialValue: data['title'] ? data.test_output : ''
            })(
              <Input placeholder='用于判题的样例输出' type='textarea'
                autosize={{minRows: 2}} />
            )}

          </FormItem>
          {keys.length > 0 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={() => this.remove(k)}
            />
          ) : null}
        </div>
      )
    })

    return (
      <Spin tip='loading' spinning={loading} key={id}>
        <QueueAnim className='problem-edit'>
          <div className='h-1' key='problem-edit-header'>
            {id ? <span><Link to='admin/contest-list'>修改题目</Link> #{id}</span> : '添加题目'}
            {id && <Link to={`/admin/problem-run-data?id=` + id} style={{marginLeft: 10}}><Tag color='blue'>管理测试数据</Tag></Link>}
          </div>
          <div className='problem-edit-content' key='problem-edit-content'>
            <Form
              onSubmit={this.handleSubmit}
              layout='vertical'
              key={'problem-edit-content-' + id}
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
                  initialValue: data['title'] ? data.input : ''
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
                  initialValue: data['title'] ? data.output : ''
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
                      initialValue: true
                    })(
                      <Switch defaultChecked={true} />
                    )}
                  </FormItem>
                </Col>
                <Col xs={{span: 24}} sm={{span: 12}} style={{textAlign: 'left'}}>
                  <FormItem>
                    <span className='ant-form-item-required span-label'>是否特判 </span>
                    {getFieldDecorator('spj', {
                      rules: [{required: true, message: '请选择是否特判'}],
                      initialValue: false
                    })(
                      <Switch defaultChecked={false} />
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
              {!id && <FormItem
                {...formItemLayout}
                label='测试输入 1'
                key={'test-input1'}
              >
                {getFieldDecorator('test_input#1', {
                  rules: [{required: false, message: '请输入测试输入'}],
                  initialValue: data['title'] ? data.test_input : ''
                })(
                  <Input placeholder='用于判题的样例输入' type='textarea'
                    autosize={{minRows: 2}} />
                )}
              </FormItem>
              }
              {!id && <FormItem
                {...formItemLayout}
                label='测试输出 1'
                key={'test-output1'}
              >
                {getFieldDecorator('test_output#1', {
                  rules: [{required: true, message: '请输入测试输出'}],
                  initialValue: data['title'] ? data.test_output : ''
                })(
                  <Input placeholder='用于判题的样例输出' type='textarea'
                    autosize={{minRows: 2}} />
                )}

              </FormItem>}
              {!id && formItems}
              <br />
              {!id && <FormItem {...formItemLayout}>
                <Button type="dashed" onClick={this.add} style={{width: '60%'}}>
                  <Icon type="plus" /> 增加测试数据
                </Button>
              </FormItem>}
              <FormItem
                {...formItemLayout}
                label='来源'
              >
                {getFieldDecorator('source', {
                  rules: [{required: false, message: '可输入来源'}],
                  initialValue: data['title'] ? data.source : ''
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
                <Button className='contest-edit-submit' size='large' type='primary'
                  onClick={id ? this.handleChange : this.handleAdd}>
                  {id ? '修改题目' : '添加题目'}
                </Button>
                {
                  id &&
                  <Button type='danger' size='large' style={{marginLeft: 10}}
                    onClick={this.onConfirmDel}>删除题目</Button>
                }
              </FormItem>
            </Form>
          </div>
        </QueueAnim>
      </Spin>
    )
  }
}

export default ProblemEdit
