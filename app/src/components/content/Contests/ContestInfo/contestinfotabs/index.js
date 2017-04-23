/**
 * Created by out_xu on 17/3/11.
 */
import React from 'react'
import { Link } from 'react-router'
import { Table } from 'antd'
import './index.less'
import { colorEncode, newDate, sec2Str } from 'utils'

class ContestInfoTabs extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  componentWillMount () {
    this.setState({loading: true})
    this.props.getRank(this.props.id)

    this.timer = setInterval(() => {
      this.props.getRank(this.props.id)
      const end = newDate(this.props.end_time)
      if (this.props.time > end) {
        clearInterval(this.timer)
      }
    }, 30000)
    setTimeout(() => {
      this.setState({loading: false})
    }, 1000)
  }

  componentWillUnmount () {
    // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    this.timer && clearInterval(this.timer)
  }

  render () {
    let {rankData = [], count_num: countNum} = this.props
    // 给rankData添加索引
    rankData = rankData.map((t = {}, i) => ({
      ...t,
      id: i + 1
    }))

    const columns = [{
      title: '',
      width: '1%',
      key: 'Contest-info-none',
      className: 'Contest-info-none'
    }, {
      title: '排名',
      dataIndex: 'id',
      key: 'Contest-info-rank',
      className: 'Contest-info-rank'
    }, {
      title: '用户',
      render: record => (
        <span>
          <Link to={`userpage/${record.user_id}`}> {record.user_name}</Link>
        </span>
      ),
      key: 'Contest-info-user',
      className: 'Contest-info-user'
    }, {
      title: 'ID',
      render: record => (
        <span>
          <Link to={`userpage/${record.user_id}`}> {record.user_id}</Link>
        </span>
      ),
      key: 'Contest-info-id',
      className: 'Contest-info-id'
    }, {
      title: '解决',
      dataIndex: 'solved',
      key: 'Contest-info-solved',
      className: 'Contest-info-solved'
    }, {
      title: '用时',
      render: (record) => {
        return <span>{sec2Str(record.time)}</span>
      },
      key: 'Contest-info-time',
      className: 'Contest-info-time'
    }]
    for (let i = 0; i < countNum; i++) {
      columns.push({
        title: String.fromCharCode(parseInt(i) + 65),
        render: (record) => {
          return colorEncode(record, i)
        },
        key: 'Contest-info-Problem-' + i,
        className: 'Contest-info-Problem'
      })
    }
    return (
      <Table
        columns={columns}
        rowKey={record => `contest-info-${record.id}`}
        dataSource={rankData}
        scroll={{x: countNum * 80 + 300}}
        // size='small'
        loading={this.state.loading}
        pagination={false}
        key='contest-info-content-rank'
        className='contest-info-content-table'
      />
    )
  }
}

export default ContestInfoTabs
