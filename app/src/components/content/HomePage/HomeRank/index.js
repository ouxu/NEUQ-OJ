/**
 * Created by out_xu on 16/12/23.
 */
import React from 'react'
import { Link } from 'react-router'
import { Card, Col, Row } from 'antd'
import './index.less'

const HomeRank = (props) => {
  const {data} = props
  const homeRank = (
    <div className='home-rank-ranklist-content'>
      {
        data.length > 0 && data.map((t, i) =>
          i < 9 &&
          <Row type='flex' justify='space-between' align='middle' className='rank-title' key={'home-rank-' + i}>
            <Col span='4'>{i + 1}</Col>
            <Col span='8'> <Link to={`/userpage/${t.id}`}>{t.name}</Link></Col>
            <Col span='4'>{t.submit}</Col>
            <Col span='4'>{t.solved}</Col>
            <Col span='4'>{parseInt(100 * (t.solved / t.submit))}%</Col>
          </Row>,
        )}
    </div>
  )
  const extra = <Link to='/ranklist'>More</Link>
  return (
    <Card title='排行榜'
      style={{marginBottom: 15}}
      bodyStyle={{padding: 0}}
      className='home-rank-ranklist'
      extra={extra}
    >
      <div className='home-rank-ranklist-wrap'>
        <Row type='flex' justify='space-between' align='middle'
          className='home-rank-ranklist-title home-rank-ranklist-content' key='home-rank'>
          <Col span='4'>No.</Col>
          <Col span='8'>昵称</Col>
          <Col span='4'>提交</Col>
          <Col span='4'>正确</Col>
          <Col span='4'>AC率</Col>
        </Row>
        {homeRank}
      </div>
    </Card>
  )
}

export default HomeRank
