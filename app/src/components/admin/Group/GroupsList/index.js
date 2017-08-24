import React, { Component } from 'react'
import { Icon, Table, Tag } from 'antd'
import { color } from 'utils'
import QueueAnim from 'rc-queue-anim'
import { Link } from 'react-router'
class GroupsManage extends Component {

  componentDidMount () {
    const userRole = window.localStorage.getItem('neuq_oj.role')
    if (userRole === 'admin') {
      this.props.getGroupTable()
    } else {
      this.props.getGroupTableMe()
    }
  }

  render () {
    const title = () => (
      <Link to='/admin/group-create'>
        创建用户组 <Icon type='plus-square-o' />
      </Link>
    )

    const userRole = window.localStorage.getItem('neuq_oj.role')
    const {groups: {groupsMe, groupsTable}} = this.props
    const {groups: data = []} = userRole === 'admin' ? groupsTable : groupsMe

    const privacyStatus = [
      '公开',
      '加密',
      '私有'
    ]
    const colorArr = {
      0: color.green,
      1: color.purple,
      2: color.red
    }
    const columns = [{
      title: '',
      width: '1%',
      key: 'groups-none',
      className: 'groups-none'
    }, {
      title: '#',
      dataIndex: 'id',
      key: 'groups-id',
      width: 60,
      className: 'groups-id'
    }, {
      title: '用户组名称',
      render: record =>
        (<span>
          <div className='groups-title-content'>
            <Link to={`groups/${record.id}`}> {record.name}</Link>
          </div>
        </span>),
      key: 'groups-title',
      className: 'groups-title'
    }, {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'groups-created-at'
    }, {
      title: '上限',
      dataIndex: 'max_size',
      key: 'groups-max-size'
    }, {
      title: '私有性',
      render: record => <Tag color={colorArr[record.privacy]}>{privacyStatus[record.privacy]}</Tag>,
      key: 'groups-source',
      width: 80
    }, {
      title: '操作',
      render: record => <Link to={'/admin/group-manage/' + record.id}>管理用户组</Link>,
      key: 'groups-edit',
      width: 80
    }]
    return (
      <QueueAnim className='groups-manage' delay={100}>
        <div className='h-1' key='groups-manage-header'>
          用户组列表
        </div>
        <Table
          columns={columns}
          rowKey={record => `groups-manage-${record.id}`}
          dataSource={data}
          pagination={false}
          size='small'
          key='groups-manage-table'
          className='groups-manage-table'
          title={title}
        />
      </QueueAnim>
    )
  }
}

export default GroupsManage
