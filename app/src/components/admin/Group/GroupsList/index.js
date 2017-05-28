import React, { Component } from 'react'
import { Icon, Table, Tag } from 'antd'
import { color } from 'utils'
import QueueAnim from 'rc-queue-anim'
import { Link } from 'react-router'
class GroupsManage extends Component {

  componentDidMount () {
    this.props.getGroupTable()
  }

  render () {
    const title = () => (
      <Link to='/admin/group-create'>
        创建用户组 <Icon type='plus-square-o' />
      </Link>
    )
    const {groups: {groupsTable}} = this.props
    const {groups: data = []} = groupsTable

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
      title: '创建者',
      render: record => (
        <Link to={'/userpage/' + record.owner_id}><span>{record.owner_name}</span></Link>
      ),
      key: 'groups-problemsubmit'
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
      render: record => {
        return record.is_public === 1
          ? <Tag color={color.blue}>公开</Tag>
          : <Tag color={color.red}>私有</Tag>
      },
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
