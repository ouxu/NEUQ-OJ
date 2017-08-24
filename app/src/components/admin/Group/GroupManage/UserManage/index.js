/**
 * Created by out_xu on 17/6/5.
 */
import React, { Component } from 'react'
import { Button, Icon, Input, Modal, Table } from 'antd'
import { jumpTo } from 'utils'
import SouTable from 'sou-react-table'
import 'sou-react-table/SouTable.css'
import './index.less'
const confirm = Modal.confirm

class UserManage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      tagName: '',
      selected: [],
      id: '',
      excel: false
    }
    this.handleOk = this.handleOk.bind(this)
    this.showModal = this.showModal.bind(this)
  }

  componentDidMount () {
    this.props.getGroupUsers(this.props.gid)
  }

  showModal (record) {
    this.setState({
      visible: true,
      id: record.user_id,
      tagName: record.user_tag
    })
  }

  handleOk (e) {
    e.preventDefault()
    this.setState({loading: true})
    const {tagName, id} = this.state
    const body = {
      user_tag: tagName,
      user_id: id
    }
    this.props.updateUserTag(this.props.gid, body)
    setTimeout(() => {
      this.props.getGroupUsers(this.props.gid)
      this.setState({
        loading: false,
        visible: false
      })
    }, 1000)
  }

  delGroupUsers = () => {
    this.props.delGroupUsers(this.props.gid, {user_ids: this.state.selected})
    this.props.getGroupUsers(this.props.gid)
    jumpTo('navigation')
  }

  render () {
    const {groupUsers} = this.props
    const rowSelection = {
      onChange: async (selectedRowKeys) => {
        await this.setState({
          selected: selectedRowKeys
        })
      }
    }
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
      onCellClick: (record) => this.showModal(record),
      className: 'group-manage-action mock-a'
    }]
    const showConfirm = () => {
      confirm({
        title: '你确定要删除以下成员？',
        content: this.state.selected.join('、'),
        onOk: this.delGroupUsers
      })
    }
    const footer = () => {
      let {selected} = this.state
      return (
        <div style={{marginTop: 10}}>
          <Button
            type='primary'
            onClick={showConfirm}
            disabled={selected.length < 1}
            style={{marginRight: 10}}
          >
            删除成员
          </Button>
          已选择 {selected.length} 人
        </div>
      )
    }
    const title = () => (
      <span className='news-manage-table-title'>
        <span>作业列表</span>
        <span className='news-manage-table-title-icon'>
                    添加用户 <Icon type='menu-unfold' onClick={() => this.setState({excel: !this.state.excel})} />
        </span>
      </span>
    )
    return (
      <div className='user-group-manage-wrap'>
        <div>
          <Table
            columns={columns}
            rowKey={record => record.user_id}
            dataSource={groupUsers}
            key='group-homework-table'
            className='group-homework-table'
            title={title}
            pagination={false}
            size='small'
            rowSelection={rowSelection}
          />
          {footer()}
        </div>

        {
          this.state.excel && (
            <div className='user-group-manage-excel'>
              <SouTable
                tableData={[]}
                width={200}
                minTableCol={2}
                minTableRow={20}
                minCellWidth={50}
                cellHeight={28}
                getData={function getData (data) {
                  console.log(data)
                }}
              />
            </div>
          )
        }
        <Modal
          visible={this.state.visible}
          title='修改成员名片'
          onOk={this.handleOk}
          onCancel={() => this.setState({visible: false})}
          footer={false}
          width={300}
        >
          <Input
            placeholder='请输入要修改的备注名'
            onChange={e => {
              this.setState({
                tagName: e.target.value
              })
            }}
          />
          <Button
            key='submit'
            type='primary'
            size='large'
            loading={this.state.loading}
            style={{marginTop: 10, width: '100%'}}
            onClick={this.handleOk}
          >
            提交
          </Button>
        </Modal>
      </div>
    )
  }
}

export default UserManage
