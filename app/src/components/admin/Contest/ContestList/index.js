/**
 * Created by out_xu on 17/3/26.
 */
import React, { Component } from 'react'
import { Link } from 'react-router'
import { color, getLocalStorage, newDate, openInNewTab } from 'utils'
import './index.less'
import { Icon, Input, Progress, Table, Tag } from 'antd'
import QueueAnim from 'rc-queue-anim'

const Search = Input.Search

// 更新竞赛描述字段，题目
class ContestList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchText: '',
      presentTime: new Date()
    }
    this.onInputChange = this.onInputChange.bind(this)
    this.onSeacrch = this.onSeacrch.bind(this)
    this.openContest = this.openContest.bind(this)
  }

  componentDidMount () {
    const page = window.sessionStorage.getItem('neuq_oj.contestspagecurr') || 1
    const size = window.sessionStorage.getItem('neuq_oj.contestspagesize') || 20
    this.props.getContestsMine(page, size)
  }

  onInputChange (e) {
    this.setState({searchText: e.target.value})
  }

  onSeacrch () {
    const searchText = encodeURIComponent(this.state.searchText)
    if (searchText.length < 1) {
      const page = 1
      const size = window.sessionStorage.getItem('neuq_oj.contestspagesize')
      this.props.getContestsMine(page, size)
    } else {
      this.props.searchContests(searchText)
    }
  }

  openContest (record) {
    openInNewTab('contests/' + record.id)
  }

  render () {
    const {contest: {contestsTable: data}} = this.props

    const privatestatus = [
      '公开',
      '加密',
      '私有'
    ]
    const colorArr = {
      0: color.green,
      1: color.purple,
      2: color.red
    }
    const progress = {
      unstart: time => (
        <div>
          <Progress
            percent={0}
            status='active'
            strokeWidth={5}
            className='contests-status-progress'
          />
          未开始 @ {time}
        </div>
      ),
      running: (time, startTime, endTime) => (
        <div>
          <Progress
            status='active'
            percent={parseInt(100 * (this.state.presentTime - startTime) / (endTime - startTime))}
            strokeWidth={5}
            className='contests-status-progress'
            format={percent => percent}
          />
          进行中 @ {time}
        </div>
      ),
      ended: time => (
        <div>
          <Progress
            percent={100}
            status='success'
            strokeWidth={5}
            className='contests-status-progress'
          />
          已结束 @ {time}
        </div>
      )
    }
    const columns = [{
      title: '',
      width: '1%',
      key: 'contest-manage',
      className: 'contest-manage-none'
    }, {
      title: '#',
      dataIndex: 'id',
      key: 'contest-manage-id',
      onCellClick: this.openContest,
      className: 'contest-manage- mock-a'
    }, {
      title: '标题',
      dataIndex: 'title',
      key: 'contest-manage-title',
      width: 200,
      onCellClick: this.openContest,
      className: 'contest-manage-title mock-a'
    }, {
      title: '状态',
      render: (record) => {
        const startTime = newDate(record.start_time)
        const endTime = newDate(record.end_time)
        const startStatus = (this.state.presentTime < startTime)
        const endStatus = (this.state.presentTime > endTime)
        return (
          <div>
            {startStatus ? progress.unstart(record.start_time) : ''}
            {(startStatus === false && endStatus === false) ? progress.running(record.end_time, startTime, endTime) : ''}
            {endStatus ? progress.ended(record.end_time) : ''}
          </div>
        )
      },
      key: 'contest-manage-UpdatePassword',
      className: 'contest-manage-UpdatePassword'
    }, {
      title: '权限',
      render: record => <Tag color={colorArr[record.private]}>{privatestatus[record.private]}</Tag>,
      key: 'contest-manage-date',
      className: 'contest-manage-date'
    }, {
      title: '操作',
      render: (record) => <Link to={'/admin/contest-edit/' + record.id}>修改</Link>,
      width: 40,
      key: 'contest-manage-action',
      className: 'contest-manage-action'
    }]
    const pagination = {
      pageSize: Number(window.sessionStorage.getItem('neuq_oj.contestspagesize')),
      current: Number(window.sessionStorage.getItem('neuq_oj.contestspagecurr')),
      total: Number(window.sessionStorage.getItem('neuq_oj.contestspagecount')),
      showSizeChanger: true,
      onShowSizeChange: (current, pageSize) => {
        const searchText = encodeURIComponent(this.state.searchText)
        if (searchText.length < 1) {
          this.props.getContestsMine(current, pageSize)
        } else {
          this.props.searchContests(searchText, current, pageSize)
        }
      },
      onChange: (current) => {
        window.sessionStorage.setItem('neuq_oj.contestspagecurr', current)
        const searchText = encodeURIComponent(this.state.searchText)
        const pageSize = window.sessionStorage.getItem('neuq_oj.contestspagesize')
        if (searchText.length < 1) {
          this.props.getContestsMine(current, pageSize)
        } else {
          this.props.searchContests(searchText, current, pageSize)
        }
      }
    }
    const title = () => {
      const role = getLocalStorage('neuq_oj.role')
      if (role === 'admin') {
        return (
          <span className='contest-manage-table-title'>
            <span className='contest-manage-table-title-icon'>
            创建竞赛 <Link to='/admin/contest-edit'><Icon type='plus-square-o' /></Link></span>
            <span>
              <Search
                placeholder='标题'
                size='small'
                value={this.state.searchText}
                onChange={this.onInputChange}
                onPressEnter={this.onSeacrch}
                onSearch={this.onSeacrch}
              /></span>
          </span>
        )
      } else {
        return (
          <span className='contest-manage-table-title'>
            <span className='contest-manage-table-title-icon'>
            创建竞赛 <Link to='/admin/contest-edit'><Icon type='plus-square-o' /></Link></span>
            <span />
          </span>
        )
      }
    }

    return (
      <QueueAnim className='contest-manage' delay={100}>
        <div className='h-1' key='contest-manage-header' >
          竞赛列表
        </div>
        <Table
          columns={columns}
          rowKey={record => `contest-manage-${record.id}`}
          dataSource={data.contests}
          size='small'
          key='contest-manage-table'
          className='contest-manage-table'
          title={title}
          pagination={pagination}
        />
      </QueueAnim>
    )
  }
}

export default ContestList
