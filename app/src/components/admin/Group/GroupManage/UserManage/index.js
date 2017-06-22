/**
 * Created by out_xu on 17/6/5.
 */
import React, { Component } from 'react'
import { Popconfirm, Table,Modal,Button } from 'antd'

class UserManage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      content: ''
    }
    this.handleOk = this.handleOk.bind(this)
    this.showModal = this.showModal.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.onConfirm = this.onConfirm.bind(this)
  }

  showModal (id) {
    this.setState({
      content: null,
      visible: true,
      id: id
    })
  }
  handleCancel () {
    this.setState({visible: false})
  }
  async onConfirm (e) {
    e.preventDefault()
    await this.props.delNews(this.state.id)
    await this.props.getNewsList()
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
  render () {
    const {groupUsers} = this.props
    const columns = [{
      title: '',
      width: '1%',
      key: 'group-manage',
      className: 'group-manage'
    }, {
      title: '#',
      dataIndex: 'id',
      width: 40,
      key: 'group-manage-id',
      className: 'group-manage-id'
    }, {
      title: '成员昵称',
      dataIndex: 'name',
      key: 'group-manage-name',
      className: 'group-manage-name'
    }, {
      title: '成员ID',
      dataIndex: 'user_id',
      key: 'group-manage-user-id',
      className: 'group-manage-user-id'
    }, {
      title: '成员名片',
      dataIndex: 'user_tag',
      key: 'group-manage-user-tag',
      className: 'group-manage-user-tag'
    }, {
      title: '操作',
      render: () => '修改名片',
      width: 80,
      key: 'group-manage-action',
      onCellClick: (record) => this.showModal(record.id),
      className: 'group-manage-action mock-a'
    }, {
      render: record => (
        <Popconfirm
          title='你确定要移除本成员吗？'
          onConfirm={() => this.onConfirm(record.id)}
          okText='Yes'
          cancelText='No'
        >
          <a>移除</a>
        </Popconfirm>
      ),
      width: 40,
      key: 'group-manage-del',
      className: 'group-manage-action'
    }]
    return (
      <div style={{backgroundColor: '#fff'}}>
        <Table
          columns={columns}
          rowKey={record => `users-manage-${record.id}`}
          dataSource={groupUsers}
          pagination={false}
          size='small'
          key='group-homework-table'
          className='group-homework-table'
          title={() => '作业列表'}
        />
        <Modal
          visible={this.state.visible}
          title='修改成员名片'
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
          {this.state.id}
          <div style={{margin: '24px 0'}} />
        </Modal>
      </div>
    )
  }
}

export default UserManage
