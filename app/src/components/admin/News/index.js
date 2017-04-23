import React, { Component } from 'react'
import { Button, Form, Icon, Input, Modal, Popconfirm, Radio, Table } from 'antd'
import './index.less'

const RadioGroup = Radio.Group
const FormItem = Form.Item

// TODO 公告 content
@Form.create()
class NewsManage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      visible: false,
      title: null,
      content: null,
      important: null,
      id: NaN
    }
    this.editNew = this.editNew.bind(this)
    this.delNew = this.delNew.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.showModal = this.showModal.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.onConfirm = this.onConfirm.bind(this)
  }

  async showModal () {
    await this.setState({
      title: null,
      content: null,
      importance: null,
      id: NaN
    })
    await this.setState({
      visible: true
    })
  }

  handleOk (e) {
    e.preventDefault()
    this.setState({loading: true})

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        await this.props.editNews(values, this.state.id)
        await this.setState({
          visible: false
        })
        await this.props.getNewsList()
        await this.setState({
          title: null,
          content: null,
          importance: null,
          id: NaN
        })
      }
    })
    setTimeout(() => {
      this.setState({loading: false})
    }, 1000)
  }

  handleCancel () {
    this.setState({visible: false})
  }

  createMarkup = html => ({__html: html});

  async editNew (record) {
    await this.props.getNews(record.id)
    await this.setState({
      visible: true,
      title: this.props.news.title,
      content: this.props.news.content,
      importance: this.props.news.importance,
      id: record.id
    })
  }

  async delNew (record) {
    this.setState({
      id: record.id
    })
  }

  async onConfirm (e) {
    e.preventDefault()
    await this.props.delNews(this.state.id)
    await this.props.getNewsList()
  }

  render () {
    let {newslist = []} = this.props
    const title = () => (
      <span className='news-manage-table-title'>
        <span>公告列表</span>
        <span className='news-manage-table-title-icon'>
                    发布公告 <Icon type='plus-square-o' onClick={this.showModal} />
        </span>
      </span>
    )
    const columns = [{
      title: '',
      width: '1%',
      key: 'News-manage',
      className: 'News-manage-none'
    }, {
      title: '#',
      dataIndex: 'id',
      key: 'News-manage-id',
      className: 'News-manage-id'
    }, {
      title: '标题',
      dataIndex: 'title',
      key: 'News-manage-title',
      width: 300,
      className: 'News-manage-title'
    }, {
      title: '创建者',
      dataIndex: 'author_id',
      key: 'News-manage-author',
      className: 'News-manage-author'
    }, {
      title: '修改时间',
      dataIndex: 'updated_at',
      key: 'News-manage-UpdatePassword',
      className: 'News-manage-UpdatePassword'
    }, {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'News-manage-date',
      className: 'News-manage-date'
    }, {
      title: '操作',
      render: () => <a>修改</a>,
      width: 40,
      key: 'News-manage-action',
      onCellClick: this.editNew,
      className: 'News-manage-action'
    }, {
      render: () => <Popconfirm title='你确定要删除本条通知吗？' onConfirm={this.onConfirm} okText='Yes' cancelText='No'>
        <a>删除</a>
      </Popconfirm>,
      width: 40,
      key: 'News-manage-del',
      onCellClick: this.delNew,
      className: 'News-manage-action'
    }]
    const {getFieldDecorator} = this.props.form

    return (
      <div className='news-manage'>
        <div className='h-1'>
              主页公告
          </div>
        <Table
          columns={columns}
          rowKey={record => `news-manage-${record.id}`}
          dataSource={newslist}
          pagination={false}
          size='small'
          key='news-manage-table'
          className='news-manage-table'
            // expandedRowRender={record => <p dangerouslySetInnerHTML={this.createMarkup(record.content)}/>}
          title={title}
          />
        <Modal
          visible={this.state.visible}
          title='添加公告'
          onOk={this.handleOk}
          maskClosable={false}
          onCancel={this.handleCancel}
          afterClose={() => {
          }}
          footer={[
            <Button key='back' size='large' onClick={this.handleCancel}>取消</Button>,
            <Button key='submit'
              type='primary'
              size='large'
              loading={this.state.loading}
              onClick={this.handleOk}>
                    提交
                </Button>
          ]}
          >
          <Form onSubmit={this.handleOk}>
            <FormItem>
              {getFieldDecorator('title', {
                rules: [{required: true, message: '请输入标题'}],
                initialValue: this.state.title ? this.state.title : ''
              })(
                <Input type='textarea' placeholder='请输入标题' autosize={{maxRows: 6}} />
                    )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('content', {
                rules: [{required: true, message: '请输入内容！'}],
                initialValue: this.state.content ? this.state.content : ''
              })(
                <Input type='textarea' placeholder='请输入内容，支持 Markdown 语法，请在 Markdown 编辑器中编辑后粘贴'
                  autosize={{minRows: 2, maxRows: 6}} />
                    )}
            </FormItem>
            <FormItem>
              <span style={{marginRight: '10px'}}>请选择重要程度，会根据程度展示不同样式</span>
              {getFieldDecorator('importance', {
                rules: [{required: true, message: '请选择！'}],
                initialValue: this.state.importance ? this.state.importance : ''
              })(
                <RadioGroup onChange={this.onChange}>
                  <Radio value={0}>固定</Radio>
                  <Radio value={1}>普通</Radio>
                  <Radio value={2}>重要</Radio>
                  <Radio value={3}>紧急</Radio>
                </RadioGroup>
                    )}
            </FormItem>
          </Form>
          <div style={{margin: '24px 0'}} />
        </Modal>
      </div>
    )
  }
}

export default NewsManage
