/**
 * Created by out_xu on 17/1/5.
 */
import React from 'react'

import QueueAnim from 'rc-queue-anim'
import { Button, Input, Table } from 'antd'
import { LanguageSelect, ResultSelect } from 'components/plugins/SelectBox'
import './index.less'
import { columns } from 'components/plugins/TableData'

class StatusTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      problem_id: null,
      result: null,
      language: null,
      user_id: null
    }
    this.onInputUser = this.onInputUser.bind(this)
    this.onInputId = this.onInputId.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.SelectResult = this.SelectResult.bind(this)
    this.SelectLanguage = this.SelectLanguage.bind(this)
    this.Cancel = this.Cancel.bind(this)
  }

  componentWillMount () {
    const page = window.sessionStorage.getItem('neuq_oj.statuspagecurr') || 1
    const size = window.sessionStorage.getItem('neuq_oj.statuspagesize') || 20
    this.props.getStatusTable(page, size)
  }

  SelectResult (value) {
    this.setState({
      result: value
    })
  }

  SelectLanguage (value) {
    this.setState({
      language: value
    })
  }

  onInputUser (e) {
    const {value} = e.target
    const reg = /^\d+$/
    if ((!isNaN(value) && reg.test(value)) || value === '') {
      this.setState({user_id: value === '' ? null : value})
    }
  }

  onInputId (e) {
    const {value} = e.target
    const reg = /^\d+$/
    if ((!isNaN(value) && reg.test(value)) || value === '') {
      this.setState({problem_id: value === '' ? null : value})
    }
  }

  onSearch () {
    const searchobj = this.state
    const page = 1
    const size = window.sessionStorage.getItem('neuq_oj.statuspagesize')
    this.props.getStatusTable(page, size, searchobj)
  }

  Cancel () {
    this.setState({
      problem_id: null,
      user_id: null
    })
  }

  render () {
    const {statusTable: data} = this.props

    const pagination = {
      pageSize: Number(window.sessionStorage.getItem('neuq_oj.statuspagesize')),
      current: Number(window.sessionStorage.getItem('neuq_oj.statuspagecurr')),
      total: 10000,
      showSizeChanger: true,
      onShowSizeChange: (current, pageSize) => {
        const searchobj = this.state
        this.props.getStatusTable(current, pageSize, searchobj)
      },
      onChange: (current) => {
        const searchobj = this.state
        const pageSize = window.sessionStorage.getItem('neuq_oj.statuspagesize')
        this.props.getStatusTable(current, pageSize, searchobj)
      }
    }

    return (
      <QueueAnim className='status-table-warp' delay={100}>
        <div className='status-table-header' key='status-2'>
          <span className='status-table-header-title'>最近提交</span>

          <div className='status-table-header-other'>
            <Input
              placeholder='题号'
              value={this.state.problem_id}
              onChange={this.onInputId}
              onPressEnter={this.onSearch}
              style={{width: '120px'}}
            />
            <Input
              placeholder='用户ID'
              value={this.state.user_id}
              onChange={this.onInputUser}
              onPressEnter={this.onSearch}
              style={{width: '120px'}}
            />

            <ResultSelect handleChange={this.SelectResult} />
            <LanguageSelect handleChange={this.SelectLanguage} />
            <Button type='primary' onClick={this.onSearch}>搜索</Button>

            {/* <ButtonGroup> */}
            {/* <Button type="primary" onClick={this.onSeacrch}>搜索</Button> */}
            {/* <Tooltip title="结果状态和语言选择不清除!" placement='bottom'> */}
            {/* <Button type="primary" icon="close-circle" onClick={this.Cancel}/> */}
            {/* </Tooltip> */}
            {/* </ButtonGroup> */}
          </div>
        </div>
        <Table
          columns={columns}
          rowKey={record => `status-${record.id}`}
          dataSource={data}
          scroll={{x: 960}}
          // bordered
          // 分页
          pagination={pagination}
          key='status-1'
        />
      </QueueAnim>
    )
  }
}

export default StatusTable
