import React, {Component} from 'react'
import './index.less'
import {Button, Form, Input, Table, Modal, notification} from 'antd'
import copy from 'copy-to-clipboard'

const confirm = Modal.confirm
const FormItem = Form.Item
import QueueAnim from 'rc-queue-anim'


@Form.create()
class TeamGenerator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      prefix: null,
      num: null,
      resultData: [],
      names: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, value) => {
      if (!err) {
        value.is_closed = value.is_closed === '1'
        let {names, num, prefix} = value
        names = names.split(',')
        confirm({
          title: '确认生成',
          content: '请认真审核信息!',
          onOk: async () => await this.props.createAccount({names, num, prefix})
        })
      }
    })
  }

  handleCopy=()=>{
    try {
      const {teamList} = this.props.generator
      const text = teamList.map(item => Object.keys(item).map(key => item[key]).join(' ')).join('\n')
      copy(text);
      notification.open({
        message: '你已成功复制到剪切板'
      });
    } catch (e) {
      notification.open({
        message: '请生成帐号后复制'
      });
    }
}

  render() {
    console.log(this.props.generator)
    const {teamList} = this.props.generator
    const {getFieldDecorator} = this.props.form
    const formItemLayout = {}
    const columns = [{
      title: '帐号',
      dataIndex: 'email'
    }, {
      title: '密码',
      dataIndex: 'password'
    }, {
      title: '队伍名称',
      dataIndex: 'name'
    }]
    // const resultData = [{
    //   key:'',
    //   email:'',
    //   password:'',
    //   name:''
    // }]
    // const {generator: {teamTable = []}} = this.props
    console.log(this.state.resultData)
    return (
      <div>
        <QueueAnim className='contest-edit' delay={100} type='bottom'>
          <div className='h-1'>帐号生成</div>
          <div className='contest-edit-content'>
            <Form onSubmit={this.handleSubmit} key={'contest-edit-content'}>
              <FormItem
                {...formItemLayout}
                label='队伍前缀'
              >
                {getFieldDecorator('prefix', {
                  rules: [{required: true, message: '请输入队伍前缀'}],
                  initialValue: ''
                })(
                  <Input placeholder='请输入队伍前缀' type='textarea' autosize={{minRows: 1, maxRows: 6}}/>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label='生成帐号数量'
              >
                {getFieldDecorator('num', {
                  rules: [{required: true, message: '请输入帐号数量'}],
                  initialValue: ''
                })(
                  <Input placeholder='请输入帐号数量' type='textarea'
                         autosize={{minRows: 1, maxRows: 6}}/>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label='队伍名称（选填，队名之间请英文逗号分隔）'
              >
                {getFieldDecorator('names', {
                  initialValue: ''
                })(
                  <Input placeholder='请输入队伍名称' type='textarea'
                         autosize={{minRows: 3, maxRows: 6}}/>
                )}
              </FormItem>
              <FormItem>
                <Button type='primary' size='large' onClick={this.handleSubmit}>生成帐号</Button>
              </FormItem>
            </Form>
            <div>
              <h2>生成帐号列表</h2>
              <Table columns={columns} dataSource={teamList} size="middle" rowKey={record => record.id} pagination={false}/>
              <Button type='primary' size='large' className='copy' onClick={this.handleCopy}>点击复制</Button>
            </div>
          </div>
        </QueueAnim>
      </div>
    )
  }
}

export default TeamGenerator
