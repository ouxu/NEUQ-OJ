/**
 * Created by out_xu on 17/3/26.
 */
import React, {Component} from 'react'
import {Link} from 'react-router'
import newDate from '../../../../utils/newDate'
import './index.less'
import {Icon, Progress, Table} from 'antd'
class ContestList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      presentTime: new Date()
    }
  }

  render () {
    const {data} = this.props
    const privatestatus = [
      '公开',
      '加密',
      '私有'
    ]
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
      key: 'news-manage',
      className: 'news-manage-none'
    }, {
      title: '#',
      dataIndex: 'id',
      key: 'contest-manage-id',
      className: 'news-manage-num'
    }, {
      title: '标题',
      dataIndex: 'title',
      key: 'news-manage-title',
      width: 200,
      className: 'news-manage-title'
    }, {
      title: '状态',
      render: (record) => {
        const startTime = newDate(record.start_time)
        const endTime = newDate(record.end_time)
        const start_status = (this.state.presentTime < startTime)
        const end_status = (this.state.presentTime > endTime)
        return (
          <div>
            {start_status ? progress.unstart(record.start_time) : ''}
            {(start_status === false && end_status === false) ? progress.running(record.end_time, startTime, endTime) : ''}
            {end_status ? progress.ended(record.end_time) : ''}
          </div>
        )
      },
      key: 'news-manage-update',
      className: 'news-manage-update'
    }, {
      title: '权限',
      render: record =>
                (<span>
                  {privatestatus[record.private]}
                </span>),
      key: 'news-manage-date',
      className: 'news-manage-date'
    }, {
      title: '操作',
      render: (record) => <Link to={'admin/contest-edit/' + record.id}>修改</Link>,
      width: 40,
      key: 'news-manage-action',
      className: 'news-manage-action'
    }]
    const title = () => (
      <span className='contest-manage-table-title'>
        <span>我有权限管理的竞赛</span>
        <span className='contest-manage-table-title-icon'>创建竞赛 <Link to='admin/contest-edit'><Icon type='plus-square-o' /></Link></span>
      </span>
        )
    return (
      <div>
        <div className='h-1'>
                    竞赛列表
                </div>
        <Table
          columns={columns}
          rowKey={record => `contest-manage-${record.id}`}
          dataSource={data.contests}
          pagination={false}
          size='small'
          key='contest-manage-table'
          className='contest-manage-table'
          title={title}
                />
      </div>
    )
  }
}

export default ContestList
