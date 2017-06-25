/**
 * Created by out_xu on 17/6/5.
 */
import React, { Component } from 'react'
import { Col, Input, Modal, Row, Table } from 'antd'
const confirm = Modal.confirm
class Homework extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  delHomework = (record) => {
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
        // this.props.deleteProblem(record.id, {
        //   'password': this.state.password
        // })
        // const page = window.sessionStorage.getItem('neuq_oj.problempagecurr') || 1
        // const size = window.sessionStorage.getItem('neuq_oj.problempagesize') || 20
        // await this.props.getProblemTable(page, size)
      }
    })
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
      key: 'group-manage-date',
      width: 140,
      className: 'group-manage-date'
    }, {
      title: '操作',
      render: () => '修改',
      width: 40,
      key: 'group-manage-action',
      onCellClick: (record) => this.showEditModal(record.id),
      className: 'group-manage-action mock-a'
    }, {
      render: () => '删除',
      width: 40,
      key: 'group-manage-del',
      onCellClick: this.delHomework,
      className: 'group-manage-action mock-a'
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
              title={() => '考试列表'}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Homework
