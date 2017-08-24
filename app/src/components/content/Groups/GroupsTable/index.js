/**
 * Created by out_xu on 17/1/3.
 */
import React from 'react'
import { Link } from 'react-router'
import QueueAnim from 'rc-queue-anim'
import { Input, message, Table, Tag } from 'antd'
import { color, goto } from 'utils'
import './index.less'
const Search = Input.Search
class GroupsTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchText: '',
      password: ''
    }
    this.onInputChange = this.onInputChange.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.verifyPermission = this.verifyPermission.bind(this)
  }

  componentDidMount () {
    const page = window.sessionStorage.getItem('neuq_oj.groupspagecurr') || 1
    const size = window.sessionStorage.getItem('neuq_oj.groupspagesize') || 20
    this.props.getGroupTable(page, size)
  }

  onInputChange (e) {
    this.setState({searchText: e.target.value})
  }

  onSearch () {
    const searchText = encodeURIComponent(this.state.searchText)
    if (searchText.length < 1) {
      const page = 1
      const size = window.sessionStorage.getItem('neuq_oj.groupspagesize')
      this.props.getGroupTable(page, size)
    } else {
      this.props.searchGroups(searchText)
    }
  }

  async verifyPermission (record) {
    try {
      await this.props.tokenVerify()
      if (record.privacy === 0 || 2) {
        await this.props.joinGroup(record.id)
        goto(`/groups/${record.id}`)
      } else if (record.privacy === 1) {
        confirm({
          title: '请输入密码进入！',
          content: (
            <Input
              type='password'
              onChange={(e) => this.setState({password: e.target.value})}
              placeholder='请输入您的登录密码'
            />
          ),
          onOk: async() => {
            await this.props.deleteProblem(this.props.params.id, {password: this.state.password})
            goto(`/groups/${record.id}`)
          }
        })
      }
    } catch (e) {
      if (e.message === '未登录') {
        message.error(e.message)
      }
    }
  }

  handleCancel () {
    this.setState({
      visible: false
    })
  }

  handleOk () {
    const body = {password: this.state.password}
    this.props.joinContest(this.state.contestId, body)
    this.setState({
      visible: false
    })
    goto(`/contests/${this.state.contestId}`)
  }

  // 正确率
  render () {
    const {groups: {groupsTable}} = this.props
    const {groups: data = []} = groupsTable

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
      dataIndex: 'name',
      key: 'groups-title',
      onCellClick: this.verifyPermission,
      className: 'groups-title mock-a'
    }, {
      title: '创建者',
      render: record => (
        <Link to={'/userpage/' + record.owner_id}><span>{record.owner_name}</span></Link>
      ),
      sorter: (a, b) => a.submit - b.submit,
      key: 'groups-problem-submit'
    }, {
      title: '创建时间',
      dataIndex: 'created_at',
      sorter: (a, b) => a.created_at - b.created_at,
      key: 'groups-created-at'
    }, {
      title: '上限',
      dataIndex: 'max_size',
      sorter: (a, b) => a.accept - b.accept,
      key: 'groups-max-size'
    }, {
      title: '私有性',
      render: record => <Tag color={colorArr[record.privacy]}>{privacyStatus[record.privacy]}</Tag>,
      key: 'groups-source',
      width: 80
    }]
    const pagination = {
      pageSize: Number(window.sessionStorage.getItem('neuq_oj.groupspagesize')),
      current: Number(window.sessionStorage.getItem('neuq_oj.groupspagecurr')),
      total: Number(window.sessionStorage.getItem('neuq_oj.groupspagecount')),
      showSizeChanger: true,
      onShowSizeChange: (current, pageSize) => {
        const searchText = encodeURIComponent(this.state.searchText)
        if (searchText.length < 1) {
          this.props.getGroupTable(current, pageSize)
        } else {
          this.props.searchGroups(searchText, current, pageSize)
        }
      },
      onChange: (current) => {
        window.sessionStorage.setItem('neuq_oj.groupspagecurr', current)
        const searchText = encodeURIComponent(this.state.searchText)
        const pageSize = window.sessionStorage.getItem('neuq_oj.groupspagesize')
        if (searchText.length < 1) {
          this.props.getGroupTable(current, pageSize)
        } else {
          this.props.searchGroups(searchText, current, pageSize)
        }
      }
    }
    return (
      <QueueAnim className='problem-table-warp' delay={100}>
        <div className='problem-table-header' key='problem-1'>
          <span className='problem-table-header-title'>用户组列表</span>
          <div>
            <Search
              placeholder='用户组名称'
              value={this.state.searchText}
              onChange={this.onInputChange}
              onPressEnter={this.onSearch}
              onSearch={this.onSearch}
            />
          </div>
        </div>
        <Table
          columns={columns}
          rowKey={record => `problem-${record.id}`}
          dataSource={data}
          pagination={pagination}
          scroll={{x: 768}}
          key='problem-2'
        />
      </QueueAnim>
    )
  }
}

export default GroupsTable
