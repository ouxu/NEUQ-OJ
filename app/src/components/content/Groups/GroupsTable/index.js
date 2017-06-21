/**
 * Created by out_xu on 17/1/3.
 */
import React from 'react'
import { Link } from 'react-router'
import QueueAnim from 'rc-queue-anim'
import { Input, Table, Tag } from 'antd'
import { color } from 'utils'
import './index.less'
const Search = Input.Search
class ProblemsTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchText: ''
    }
    this.onInputChange = this.onInputChange.bind(this)
    this.onSearch = this.onSearch.bind(this)
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
      this.props.getProblemTable(page, size)
    } else {
      this.props.searchProblems(searchText)
    }
  }

  // 正确率
  render () {
    const {groups: {groupsTable}} = this.props
    const {groups: data = []} = groupsTable
    const colorArr = {
      1: color.green,
      2: color.red,
      3: color.blue,
      4: color.yellow
    }
    const randomN = () => Math.floor(Math.random() * 4 + 1)

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
      sorter: (a, b) => a.submit - b.submit,
      key: 'groups-problemsubmit'
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
      render: record => {
        return record.is_public === 1
          ? <Tag color={color.blue}>公开</Tag>
          : <Tag color={color.red}>私有</Tag>
      },
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
          this.props.getProblemTable(current, pageSize)
        } else {
          this.props.searchProblems(searchText, current, pageSize)
        }
      },
      onChange: (current) => {
        window.sessionStorage.setItem('neuq_oj.groupspagecurr', current)
        const searchText = encodeURIComponent(this.state.searchText)
        const pageSize = window.sessionStorage.getItem('neuq_oj.groupspagesize')
        if (searchText.length < 1) {
          this.props.getProblemTable(current, pageSize)
        } else {
          this.props.searchProblems(searchText, current, pageSize)
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
          // bordered
          // 分页
          pagination={pagination}
          scroll={{x: 768}}
          key='problem-2'
        />
      </QueueAnim>
    )
  }
}

export default ProblemsTable
