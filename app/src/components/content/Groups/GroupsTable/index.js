/**
 * Created by out_xu on 17/1/3.
 */
import React from 'react'
import { Link } from 'react-router'
import QueueAnim from 'rc-queue-anim'
import { Icon, Input, Table, Tag } from 'antd'
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
    const page = window.sessionStorage.getItem('neuq_oj.problempagecurr') || 1
    const size = window.sessionStorage.getItem('neuq_oj.problempagesize') || 20
    this.props.getProblemTable(page, size)
  }

  onInputChange (e) {
    this.setState({searchText: e.target.value})
  }

  onSearch () {
    const searchText = encodeURIComponent(this.state.searchText)
    if (searchText.length < 1) {
      const page = 1
      const size = window.sessionStorage.getItem('neuq_oj.problempagesize')
      this.props.getProblemTable(page, size)
    } else {
      this.props.searchProblems(searchText)
    }
  }

  // 正确率
  render () {
    const {data} = this.props
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
      key: 'problem-none',
      className: 'problem-none'
    }, {
      title: '#',
      render: record =>
        (<span>
          <Link to={`problems/${record.id}`}> {record.id}</Link>
        </span>),
      key: 'problem-id',
      width: 60,
      className: 'problem-id'
    }, {
      title: '用户组名称',
      render: record =>
        (<span>
          <span >{// 标签渲染
            record.tags && (record.tags.map((value, index) => (
              <Tag color={colorArr[randomN()]} key={index + 400} className='problem-title-tags'>{value.tag_title}
              </Tag>
            )))}
          </span>
          <div className='problem-title-content'>
            <Link to={`problems/${record.id}`}> {record.title}</Link>
          </div>
        </span>),
      key: 'problem-title',
      className: 'problem-title'
    }, {
      title: '私有性',
      dataIndex: 'source',
      key: 'problem-source',
      width: 80
    }, {
      title: '创建者',
      dataIndex: 'submit',
      sorter: (a, b) => a.submit - b.submit,
      key: 'problem-problemsubmit'
    }, {
      title: '创建时间',
      dataIndex: 'submit',
      sorter: (a, b) => a.submit - b.submit,
      key: 'problem-problemsubit'
    }, {
      title: '组内人数/上限',
      dataIndex: 'accepted',
      sorter: (a, b) => a.accept - b.accept,
      key: 'problem-accept'
    }]
    const pagination = {
      pageSize: Number(window.sessionStorage.getItem('neuq_oj.problempagesize')),
      current: Number(window.sessionStorage.getItem('neuq_oj.problempagecurr')),
      total: Number(window.sessionStorage.getItem('neuq_oj.problempagecount')),
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
        window.sessionStorage.setItem('neuq_oj.problempagecurr', current)
        const searchText = encodeURIComponent(this.state.searchText)
        const pageSize = window.sessionStorage.getItem('neuq_oj.problempagesize')
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
