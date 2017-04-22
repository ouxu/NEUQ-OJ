/**
 * Created by out_xu on 16/12/23.
 */
import React from 'react'
import { Link } from 'react-router'
import { Badge, Card, Col, Row } from 'antd'
// import './index.less'

const HomeStatus = (props) => {
  const result = [
    <Badge status='processing' text='等待中' />,
    <Badge status='processing' text='等待中' />,
    <Badge status='processing' text='编译中' />,
    <Badge status='processing' text='运行中' />,
    <Badge status='success' text='正确' />,
    <Badge status='error' text='格式错误' />,
    <Badge status='error' text='答案错误' />,
    <Badge status='warning' text='时间超限' />,
    <Badge status='error' text='内存错误' />,
    <Badge status='error' text='输出错误' />,
    <Badge status='error' text='运行错误' />,
    <Badge status='error' text='编译错误' />
  ]
  const {data} = props
  const homeStatus = (
    <div className='home-rank-ranklist-content'>
      {
        data.length > 0 && data.map((t, i) =>
          i < 9 &&
          <Row type='flex' justify='space-between' align='middle' className='rank-title' key={'home-status-' + i}>
            <Col span='4'>{t.id}</Col>
            <Col span='8'> <Link to={`userpage/${t.id}`}>{t.name}</Link></Col>
            <Col span='4'><Link to={`problems/${t.problem_id}`}>{t.problem_id}</Link></Col>
            <Col span='8'>{result[t.result]}</Col>
          </Row>,
        )}
    </div>
  )
  const extra = <Link to='/status'>More</Link>
  return (
    <Card title='最近提交'
      style={{marginBottom: 15}}
      bodyStyle={{padding: 0}}
      className='home-rank-ranklist'
      extra={extra}
    >
      <div className='home-rank-ranklist-wrap'>
        <Row type='flex' justify='space-between' align='middle'
          className='home-rank-ranklist-title home-rank-ranklist-content' key='home-status'>
          <Col span='4'> # </Col>
          <Col span='8'> 用户名</Col>
          <Col span='4'>问题</Col>
          <Col span='8'>运行结果</Col>
        </Row>
        {homeStatus}
      </div>
    </Card>
  )
}

export default HomeStatus
