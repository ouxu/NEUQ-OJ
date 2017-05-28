import React, { Component } from 'react'
import { Button, Form, Icon, Input, Modal, Popconfirm, Radio, Table } from 'antd'
const FormItem = Form.Item
const RadioGroup = Radio.Group

@Form.create()
class NoticeManage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      loading: false,
      title: '',
      content: ''
    }
    this.showModal = this.showModal.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  showModal () {
    this.setState({
      title: '',
      content: ''
    })
    this.setState({
      visible: true
    })
  }

  handleOk (e) {
    e.preventDefault()
    this.setState({loading: true})

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const body = {
          ...values,
          gid: this.props.gid
        }
        await this.props.createGroupNotice(body)
        await this.setState({
          visible: false
        })
        await this.props.getGroupNotices(this.props.gid)
        await this.setState({
          title: '',
          content: ''
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

  render () {
    const {groupNotices} = this.props
    const {getFieldDecorator} = this.props.form
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
      key: 'news-manage',
      className: 'news-manage-none'
    }, {
      title: '#',
      dataIndex: 'id',
      key: 'news-manage-id',
      className: 'news-manage-id'
    }, {
      title: '标题',
      dataIndex: 'title',
      key: 'news-manage-title',
      width: 300,
      className: 'news-manage-title'
    }, {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'news-manage-date',
      className: 'news-manage-date'
    }, {
      title: '操作',
      render: () => '修改',
      width: 40,
      key: 'news-manage-action',
      onCellClick: this.editNew,
      className: 'news-manage-action mock-a'
    }, {
      render: () => <Popconfirm title='你确定要删除本条通知吗？' onConfirm={this.onConfirm} okText='Yes' cancelText='No'>
        <a>删除</a>
      </Popconfirm>,
      width: 40,
      key: 'news-manage-del',
      onCellClick: this.delNew,
      className: 'news-manage-action'
    }]
    return (
      <div style={{backgroundColor: '#fff'}}>
        <Table
          columns={columns}
          rowKey={record => `news-manage-${record.created_at}`}
          dataSource={groupNotices}
          pagination={false}
          size='small'
          key='group-notice-manage-table'
          className='group-notice-manage-table'
          title={title}
        />
        <Modal
          visible={this.state.visible}
          title='添加公告'
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          key={'news-manage-modal-' + this.state.visible}
          footer={[
            <Button key='back' size='large' onClick={this.handleCancel}>取消</Button>,
            <Button
              key='submit'
              type='primary'
              size='large'
              loading={this.state.loading}
              onClick={this.handleOk}
            >
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
                <Input
                  type='textarea' placeholder='请输入内容，支持 Markdown 语法，请在 Markdown 编辑器中编辑后粘贴'
                  autosize={{minRows: 2, maxRows: 6}} />
              )}
            </FormItem>
          </Form>
          <div style={{margin: '24px 0'}} />
        </Modal>
      </div>
    )
  }
}

export default NoticeManage
