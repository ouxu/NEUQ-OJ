/**
 * Created by out_xu on 17/3/26.
 */
import React, { Component } from 'react'
import { Link } from 'react-router'
import { Button, Icon, Input, Popconfirm, Spin, Table, Tag } from 'antd'
import { color, goto, openInNewTab } from 'utils'

import './index.less'

const Search = Input.Search

class ProblemList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchText: '',
      selected: [],
      password: '',
      id: NaN
    }
    this.onInputChange = this.onInputChange.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.passwordChange = this.passwordChange.bind(this)
    this.popConfirm = this.popConfirm.bind(this)
    this.openProblem = this.openProblem.bind(this)
    this.createCon = this.createCon.bind(this)
    this.delProblem = this.delProblem.bind(this)
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

  createCon () {
    this.props.createContest({problems: this.state.selected})
    goto('/admin/contest-edit')
  }

  passwordChange (e) {
    this.setState({
      password: e.target.value
    })
  }

  openProblem = (record) => {
    openInNewTab('Problems/' + record.id)
  }

  delProblem = async (record) => {
    await this.setState({
      id: record.id
    })
  }

  popConfirm = async (e) => {
    e.preventDefault()
    let body = {
      'password': this.state.password
    }
    await this.props.deleteProblem(this.state.id, body)

    const page = window.sessionStorage.getItem('neuq_oj.problempagecurr') || 1
    const size = window.sessionStorage.getItem('neuq_oj.problempagesize') || 20
    await this.props.getProblemTable(page, size)
  }

  render () {
    const {problems: {problemTable}, loading, getProblemTable, searchProblems, createContest, deleteProblem} = this.props

    const data = problemTable.problems

    const colorArr = {
      1: color.blue,
      2: color.red,
      3: color.purple,
      4: color.yellow,
      5: color.sky
    }
    const randomN = () => Math.floor(Math.random() * 5 + 1)
    const difficultyArr = ['简单', '一般', '困难']
    const popInput = <Input type='password' onChange={this.passwordChange} placeholder='请输入您的登录密码' size='small' />
    const columns = [{
      title: '',
      width: '1%',
      key: 'problem-none',
      className: 'problem-none'
    }, {
      title: '#',
      dataIndex: 'id',
      key: 'problem-id',
      onCellClick: this.openProblem,
      width: 60,
      className: 'problem-id mock-a'
    }, {
      title: '难度',
      render: record => (
        <span >
          {difficultyArr[record.difficulty - 1]}
        </span>
        // new Array(record.difficulty).fill(<Icon type="star-o" />)
      ),
      filters: [
        {text: '简单', value: 1},
        {text: '一般', value: 2},
        {text: '困难', value: 3}
      ],
      onFilter: (value, record) => record.difficulty === Number(value),
      width: 60,
      key: 'problem-diff'
    }, {
      title: '标题',
      render: record => (
        <span>
          <span >
            <span >{// 标签渲染
              record.tags && (record.tags.map((value, index) => (
                <Tag color={colorArr[randomN()]} key={index + 400} className='problem-title-tags'>
                  {value.tag_title}
                </Tag>
              )))}
            </span>
            <span className='mock-a' onClick={() => openInNewTab('problems/' + record.id)}>
              {record.title}
            </span>
          </span>
        </span>
      ),
      key: 'problem-title',
      className: 'problem-title'
    }, {
      title: '操作',
      render: (record) => <Link to={'admin/problem-edit/' + record.id}>修改</Link>,
      width: 40,
      key: 'problem-manage-action',
      className: 'problem-manage-action'
    }, {
      title: '删除',
      render: () => <Popconfirm title={popInput} onConfirm={this.popConfirm} okText='Yes' cancelText='No'>
        <a>删除</a>
      </Popconfirm>,
      width: 40,
      key: 'problem-manage-del',
      onCellClick: this.delProblem,
      className: 'problem-manage-action'
    }]
    const rowSelection = {
      onChange: async (selectedRowKeys) => {
        await this.setState({
          selected: selectedRowKeys
        })
      }
    }

    const pagination = {
      pageSize: Number(window.sessionStorage.getItem('neuq_oj.problempagesize')),
      current: Number(window.sessionStorage.getItem('neuq_oj.problempagecurr')),
      total: Number(window.sessionStorage.getItem('neuq_oj.problempagecount')),
      showSizeChanger: true,
      showTotal: () => {
        let {selected} = this.state
        return (
          <div>
            已选择 {selected.length} 道 <Button type='primary' size='small' onClick={this.createCon}
                                            disabled={selected.length < 1}>发起竞赛</Button>
          </div>
        )
      },
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
    const title = () => (
      <span className='contest-manage-table-title'>
        <span className='contest-manage-table-title-icon'>
          创建问题 <Link to='admin/contest-edit'><Icon type='plus-square-o' /></Link></span>
        <span>
          <Search
            placeholder='题号/标题/作者/标签'
            value={this.state.searchText}
            onChange={this.onInputChange}
            onPressEnter={this.onSearch}
            onSearch={this.onSearch}
            size='small'
          />
        </span>
      </span>
    )
    return (
      <Spin tip='Loading...' spinning={loading}>
        <div className='h-1'>
          问题列表
        </div>
        <Table
          columns={columns}
          rowKey={record => record.id}
          dataSource={data}
          pagination={pagination}
          size='small'
          key='problem-manage-table'
          className='problem-manage-table'
          title={title}
          rowSelection={rowSelection}
        />
      </Spin>
    )
  }
}

export default ProblemList
