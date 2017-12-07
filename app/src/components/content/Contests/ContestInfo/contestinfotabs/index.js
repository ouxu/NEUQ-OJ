/**
 * Created by out_xu on 17/3/11.
 */
import React from 'react'
import { Link } from 'react-router'
import { Table } from 'antd'
import './index.less'
import { colorEncode, newDate, sec2Str } from 'utils'
import Footer from 'components/plugins/Footer'
import Fullscreenable from 'react-fullscreenable'
import ACMLogo from 'images/acm_logo_long.png'

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
    let {rankData: {rank_data: rankData = [], first_ac = []}, count_num: countNum} = this.props
    // 给rankData添加索引
    rankData = rankData.map((t = {}, i) => {
      return {
        ...t,
        id: i + 1
      }
    })
    const columns = [{
      title: '排名',
      width: 50,
      dataIndex: 'id',
      key: 'contest-info-rank',
      className: 'contest-info-rank'
    }, {
      title: '用户',
      render: record => (
        <span>
          <Link to={`/userpage/${record.user_id}`}> {record.user_name}</Link>
        </span>
      ),
      key: 'contest-info-user',
      className: 'contest-info-user',
      width: 100
    }, {
      title: '解决',
      dataIndex: 'solved',
      width: 35,
      key: 'contest-info-solved',
      className: 'contest-info-solved'
    }, {
      title: '用时',
      width: 100,
      render: (record) => {
        return <span>{sec2Str(record.time)}</span>
      },
      key: 'contest-info-time',
      className: 'contest-info-time'
    }]
    for (let i = 0; i < countNum; i++) {
      columns.push({
        title: String.fromCharCode(parseInt(i) + 65),
        render: (record) => {
          return colorEncode(record, i, first_ac)
        },
        key: 'contest-info-problem-' + i,
        className: 'contest-info-problem',
        width: 90
      })
    }
    const {isFullscreen, toggleFullscreen,contestInfo} = this.props
    return (
      <Table
        columns={columns}
        rowKey={record => `contest-info-${record.id}`}
        dataSource={rankData}
        scroll={{x: countNum * 90 + 1000, y: window.screen.availHeight - 135}}
        bordered
        title={() => (<div className='contest-rank-table-title'>
          <div> {isFullscreen ? <img src={ACMLogo} height={40} /> : '排行榜'} </div>
          {isFullscreen && (
            <div style={{fontSize: 28,fontWeight: 300}}>{contestInfo.title}</div>
          )}
          <div onClick={toggleFullscreen}> {isFullscreen ? '退出全屏' : '全屏显示'} </div>
        </div>)}
        footer={!isFullscreen ? false : () => <Footer />}
        loading={this.state.loading}
        pagination={false}
        key='contest-info-content-rank'
        className='contest-info-content-table contest-rank-table'
      />
    )
  }
}

export default Fullscreenable()(ContestInfoTabs)
