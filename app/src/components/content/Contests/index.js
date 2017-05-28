/**
 * Created by out_xu on 17/2/21.
 */
import React from 'react'
import { Link } from 'react-router'
import QueueAnim from 'rc-queue-anim'
import { Icon, Input, message, Modal, Progress, Spin, Table, Tag } from 'antd'
import './index.less'
import { color, goto, newDate } from 'utils'

// TODO 搜索竞赛创建者
const Search = Input.Search
class ContestPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchText: '',
      presentTime: new Date(),
      visible: false,
      contestId: null,
      password: ''
    }
    this.onInputChange = this.onInputChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onSeacrch = this.onSeacrch.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleok = this.handleok.bind(this)
    this.verifyPermission = this.verifyPermission.bind(this)
  }

  componentDidMount () {
    const page = window.sessionStorage.getItem('neuq_oj.contestspagecurr') || 1
    const size = window.sessionStorage.getItem('neuq_oj.contestspagesize') || 20
    this.props.getContestsTable(page, size)
  }

  onInputChange (e) {
    this.setState({searchText: e.target.value})
  }

  onSeacrch () {
    const searchText = encodeURIComponent(this.state.searchText)
    if (searchText.length < 1) {
      const page = 1
      const size = window.sessionStorage.getItem('neuq_oj.contestspagesize')
      this.props.getContestsTable(page, size)
    } else {
      this.props.searchContests(searchText)
    }
  }

  async verifyPermission (record) {
    try {
      const startTime = newDate(record.start_time)
      const startStatus = (this.state.presentTime > startTime)
      if (startStatus) {
        if (record.private === 1) {
          await this.props.tokenVerify()
          await this.props.getContest(record.id)
        } else if (record.private === 2) {
          await this.props.getContest(record.id)
        }
        goto(`/contests/${record.id}`)
      } else {
        message.warn('未开始')
      }
    } catch (e) {
      if (e.message === '未登录') {
        message.error(e.message)
      } else if (e.message === '权限不足' && record.private === 1) {
        this.setState({
          contestId: record.id,
          visible: true
        })
      }
    }
  }

  handleCancel () {
    this.setState({
      visible: false
    })
  }

  onPasswordChange (e) {
    this.setState({password: e.target.value})
  }

  handleok () {
    const body = {password: this.state.password}
    this.props.joinContest(this.state.contestId, body)
    this.setState({
      visible: false
    })
    goto(`/contests/${this.state.contestId}`)
  }

  render () {
    const {contests: {contestsTable = []}, loading} = this.props
    const data = contestsTable.contests

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
      key: 'status-none',
      className: 'status-none'
    }, {
      title: '#',
      dataIndex: 'id',
      width: '7%',
      key: 'contests-id',
      onCellClick: this.verifyPermission,
      className: 'contests-id'
    }, {
      title: '标题',
      dataIndex: 'title',
      width: '30%',
      key: 'contests-title',
      onCellClick: this.verifyPermission,
      className: 'contests-title'
    }, {
      title: '创建者',
      render: record => (
        <span>
          <Link to={`userpage/${record.creator_id}`}> {record.creator_name}</Link>
        </span>
      ),
      width: '10%',
      key: 'Contests-creator-name'
    }, {
      title: '状态',
      render: (record) => {
        const startTime = newDate(record.start_time)
        const endTime = newDate(record.end_time)
        const startStatus = (this.state.presentTime < startTime)
        const endStatus = (this.state.presentTime > endTime)
        return (
          <div>
            {startStatus && progress.unstart(record.start_time)}
            {(startStatus === false && endStatus === false) && progress.running(record.end_time, startTime, endTime)}
            {endStatus &&progress.ended(record.end_time)}
          </div>
        )
      },
      width: '45%',
      key: 'Contests-Status',
      className: 'Contests-Status'

    }, {
      title: '权限',
      render: record => <Tag color={colorArr[record.private]}>{privatestatus[record.private]}</Tag>,
      width: '8%',
      key: 'Contests-private',
      className: 'Contests-private'

    }]
    const pagination = {
      pageSize: Number(window.sessionStorage.getItem('neuq_oj.contestspagesize')),
      current: Number(window.sessionStorage.getItem('neuq_oj.contestspagecurr')),
      total: Number(window.sessionStorage.getItem('neuq_oj.contestspagecount')),
      showSizeChanger: true,
      onShowSizeChange: (current, pageSize) => {
        const searchText = encodeURIComponent(this.state.searchText)
        if (searchText.length < 1) {
          this.props.getContestsTable(current, pageSize)
        } else {
          this.props.searchContests(searchText, current, pageSize)
        }
      },
      onChange: (current) => {
        window.sessionStorage.setItem('neuq_oj.contestspagecurr', current)
        const searchText = encodeURIComponent(this.state.searchText)
        const pageSize = window.sessionStorage.getItem('neuq_oj.contestspagesize')
        if (searchText.length < 1) {
          this.props.getContestsTable(current, pageSize)
        } else {
          this.props.searchContests(searchText, current, pageSize)
        }
      }

    }
    return (
      <Spin tip='Loading...' spinning={loading}>
        <QueueAnim className='contests-table-wrap' delay={100}>
          <div className='contests-table-header' key='contests-1'>
            <span className='contests-table-header-title'>
            竞赛列表
          </span>
            <div>
              <Search
                placeholder='标题'
                value={this.state.searchText}
                onChange={this.onInputChange}
                onPressEnter={this.onSeacrch}
                onSearch={this.onSeacrch}
              />
            </div>
          </div>
          <Table
            columns={columns}
            rowKey={record => `contests-${record.id}`}
            dataSource={data}
            scroll={{x: 768}}
            pagination={pagination}
            key='contests-2'
          />
          <Modal
            title='请输入密码'
            visible={this.state.visible}
            onCancel={this.handleCancel}
            width={300}
            onOk={this.handleok}
          >
            <Input
              addonBefore={<Icon type='lock' />}
              type='password'
              placeholder='Password'
              size='large'
              onChange={this.onPasswordChange}
            />

          </Modal>
        </QueueAnim>
      </Spin>
    )
  }
}

export default ContestPage
