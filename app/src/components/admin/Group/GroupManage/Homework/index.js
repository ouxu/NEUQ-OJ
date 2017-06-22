/**
 * Created by out_xu on 17/6/5.
 */
import React, { Component } from 'react'
import { Col, Popconfirm, Row, Table } from 'antd'

class Homework extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const {groupUsers} = this.props
    const columns = [{
      title: '',
      width: '1%',
      key: 'group-manage',
      className: 'group-manage-none'
    }, {
      title: '#',
      dataIndex: 'user_id',
      width: 40,
      key: 'group-manage-user-id',
      className: 'group-manage-user-id'
    }, {
      title: '标题',
      dataIndex: 'title',
      key: 'news-manage-title',
      className: 'news-manage-title'
    }, {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'news-manage-date',
      width: 140,
      className: 'news-manage-date'
    }, {
      title: '操作',
      render: () => '修改',
      width: 40,
      key: 'news-manage-action',
      onCellClick: (record) => this.showEditModal(record.id),
      className: 'news-manage-action mock-a'
    }, {
      render: record => (
        <Popconfirm
          title='你确定要删除本条通知吗？'
          onConfirm={() => this.onConfirm(record.id)}
          okText='Yes'
          cancelText='No'
        >
          <a>删除</a>
        </Popconfirm>
      ),
      width: 40,
      key: 'news-manage-del',
      onCellClick: this.delNew,
      className: 'news-manage-action'
    }]
    return (
      <div style={{backgroundColor: '#fff'}}>
        <Row >
          <Col xs={{span: 24}} sm={{span: 12}}>
            <Table
              columns={columns}
              rowKey={record => `users-manage-${record.created_at}`}
              // dataSource={notices}
              pagination={false}
              size='small'
              key='group-homework-table'
              className='group-homework-table'
              title={() => '作业列表'}
            />
          </Col>
          <Col xs={{span: 24}} sm={{span: 12}}>
            <Table
              columns={columns}
              rowKey={record => `users-manage-${record.created_at}`}
              dataSource={groupUsers}
              pagination={false}
              size='small'
              key='group-exam-table'
              className='group-exam-table'
              title={()=> '考试列表'}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Homework
