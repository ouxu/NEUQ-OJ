/**
 * Created by out_xu on 17/2/21.
 */
import React, { Component } from 'react'
import { Link } from 'react-router'
import QueueAnim from 'rc-queue-anim'
import { Table } from 'antd'
import './index.less'
import { TimeSelect } from 'components/plugins/SelectBox'

// TODO 去除分页

class RankList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      scope: null
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    const page = window.sessionStorage.getItem('neuq_oj.ranklistpagecurr') || 1
    const size = window.sessionStorage.getItem('neuq_oj.ranklistpagesize') || 20
    this.props.getRankTable(page, size)
  }

  handleChange (value) {
    this.setState({
      scope: value
    })
    const page = 1
    const size = window.sessionStorage.getItem('neuq_oj.ranklistpagesize') || 20
    this.props.getRankTable(page, size, value)
  }

  render () {
    let {rankList: data = []} = this.props

    data = data.map((t = {}, i) => ({
      ...t,
      num: i + 1
    }))
    const pagination = {
      pageSize: Number(window.sessionStorage.getItem('neuq_oj.ranklistpagesize')),
      current: Number(window.sessionStorage.getItem('neuq_oj.ranklistpagecurr')),
      total: 10000,
      showSizeChanger: true,
      onShowSizeChange: (current, pageSize) => {
        const scope = this.state
        if (scope.length < 1) {
          this.props.getRankTable(current, pageSize)
        } else {
          this.props.getRankTable(current, pageSize, scope)
        }
      },
      onChange: (current) => {
        const scope = this.state
        window.sessionStorage.setItem('neuq_oj.ranklistpagecurr', current)
        const pageSize = window.sessionStorage.getItem('neuq_oj.ranklistpagesize')
        if (scope.length < 1) {
          this.props.getRankTable(current, pageSize)
        } else {
          this.props.getRankTable(current, pageSize, scope)
        }
      }
    }

    const columns = [{
      title: '',
      width: '1%',
      key: 'ranklist',
      className: 'ranklist-none'
    }, {
      title: '排名',
      dataIndex: 'num',
      key: 'ranklist-rank',
      className: 'ranklist-rank'
    }, {
      title: '用户',
      render: record => (
        <span>
          <Link to={`userpage/${record.id}`}> {record.name}</Link>
        </span>
      ),
      key: 'ranklist-user',
      className: 'ranklist-user'
    }, {
      title: 'ID',
      render: record => (
        <span>
          <Link to={`userpage/${record.id}`}> {record.id}</Link>
        </span>
      ),
      key: 'ranklist-id',
      className: 'ranklist-id'
    }, {
      title: '解决',
      dataIndex: 'solved',
      key: 'ranklist-solved',
      className: 'ranklist-solved'
    }, {
      title: '提交',
      dataIndex: 'submit',
      key: 'ranklist-submit',
      className: 'ranklist-submit'
    }, {
      title: 'AC 率',
      render: record => (
        <span>
          {parseInt(100 * (record.solved / record.submit))}%
        </span>
      ),
      width: 80,
      key: 'ranklist-ac',
      className: 'ranklist-ac'
    }]

    return (
      <div>
        <QueueAnim className='rank-table-warp' delay={100}>
          <div className='rank-table-header' key='status-2'>
            <span className='rank-table-header-title'>排行榜</span>

            <div className='rank-table-header-other'>
              <TimeSelect handleChange={this.handleChange} />
            </div>
          </div>
          <Table
            columns={columns}
            rowKey={record => `rank-table-${record.id}`}
            dataSource={data}
            scroll={{x: 680}}
            pagination={pagination}
            key='rank-table-table'
            className='rank-table-table'
          />
        </QueueAnim>

      </div>
    )
  }
}

export default RankList
