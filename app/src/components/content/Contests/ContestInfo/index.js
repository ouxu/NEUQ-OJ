/**
 * Created by out_xu on 17/3/5.
 */
import React from 'react'
import { Card, Icon, Spin, Table, Tabs } from 'antd'
import QueueAnim from 'rc-queue-anim'
import { Link } from 'react-router'
import ContestProgress from './contestprogress'
import ContestInfoTabs from './contestinfotabs'
import './index.less'
import { newDate } from 'utils'
import API from 'api'
import * as requestService from 'utils/request'
import Markdown from 'components/plugins/Markdown'
const TabPane = Tabs.TabPane
class ContestInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      time: new Date(),
      rankData: []
    }
    this.getRank = this.getRank.bind(this)
  }

  componentDidMount () {
    this.props.params.cid && this.props.getContest(this.props.params.cid)
    const {contest: {contest_info = {}}, params: {cid: id}} = this.props
    this.timer = setInterval(() => {
      this.setState({time: new Date()})
      const endTime = contest_info && newDate(contest_info.end_time)
      if (this.state.time > endTime) {
        clearInterval(this.timer)
      }
    }, 1000)
  }

  componentWillUnmount () {
    this.timer && clearInterval(this.timer)
  }

  createMarkup = html => ({__html: html})

  async getRank (id) {
    try {
      const data = await requestService.get(API.contest + id + '/ranklist')
      await this.setState({
        rankData: data
      })
    } catch (e) {
      console.error(e)
    }
  }

  render () {
    const {contest = {contest_info: {}, problem_info: []}, params: {cid: id}} = this.props
    const {contest_info = {}, problem_info = []} = contest
    const accepted = {
      Y: <Icon className='status-yes' type='check-circle' />,
      N: <Icon className='status-no' type='close-circle' />
    }
    const columns = [{
      title: '',
      width: '1%',
      key: 'contest-info-none',
      className: 'contest-info-none'
    }, {
      title: '状态',
      render: (record) => {
        const status = record.user_status
        if (status === 'Y') {
          return accepted.Y
        } else if (status === 'N') {
          return accepted.N
        }
        return null
      },
      width: '10%',
      key: 'contest-info-Status',
      className: 'contest-info-Status'
    }, {
      title: '#',
      render: record => <Link to={`contests/${id}/problem/${record.pnum}`}>
        Problem {String.fromCharCode(parseInt(record.pnum) + 65)} {record.pid}
      </Link>,
      width: '20%',
      key: 'contest-info-code',
      className: 'contest-info-code'
    }, {
      title: '标题',
      render: record => <Link to={`contests/${id}/problem/${record.pnum}`}> {record.title}</Link>,
      width: '35%',
      key: 'contest-info-title',
      className: 'contest-info-title'
    }, {
      title: '来源',
      dataIndex: 'source',
      width: '15%',
      key: 'contest-info-source',
      className: 'contest-info-source'
    }, {
      title: '提交',
      dataIndex: 'submit',
      width: '10%',
      key: 'contest-info-submit',
      className: 'contest-info-submit'
    }, {
      title: '正确',
      dataIndex: 'accepted',
      width: '10%',
      key: 'contest-info-accepted',
      className: 'contest-info-accepted'
    }]

    return (
      <Spin spinning={!(contest_info).hasOwnProperty('id')}>
        <Card
          className='contest-info-wrap'
          bodyStyle={{padding: 0}}
        >
          <QueueAnim className='contest-info-wrap' delay={100}>
            <div className='contest-info-header' key='contest-info-header'>
              <h1 className='contest-info-header-title'>
                <Link to={'/contests'}>
                  <span> # Contest-</span>
                </Link>
                {contest_info.id}
                <span className='contest-info-header-title-sub'>{contest_info.title}</span>
              </h1>
              <ContestProgress
                time={this.state.time}
                start_time={contest_info.start_time}
                end_time={contest_info.end_time}
              />
              <Markdown content={contest_info.description} />
            </div>

            <Tabs
              defaultActiveKey='contest-info-table'
              tabPosition='right'
              className='contest-info-content'
              key='contest-info-content'
            >
              <TabPane tab='题目列表' key='contest-info-table'>
                <Table
                  columns={columns}
                  rowKey={record => `contest-${record.pid}`}
                  dataSource={problem_info}
                  scroll={{x: 680}}
                  // size='small'
                  pagination={false}
                  key='contest-info-content-table'
                  className='contest-info-content-table'
                />
              </TabPane>
              <TabPane tab='排行榜' key='contest-info-rank'>
                <ContestInfoTabs
                  getRank={this.getRank}
                  count_num={problem_info.length}
                  time={this.state.time}
                  end_time={contest_info.end_time}
                  rankData={this.state.rankData}
                  id={contest_info.id}
                  scroll={{x: 960}}
                />
              </TabPane>
            </Tabs>

          </QueueAnim>
        </Card>
      </Spin>

    )
  }
}

export default ContestInfo
