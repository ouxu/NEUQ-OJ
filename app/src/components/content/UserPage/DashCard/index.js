/**
 * Created by out_xu on 17/2/20.
 */
import React from 'react'
import { Badge, Card, Col, Row } from 'antd'
import { Link } from 'react-router'
import './index.less'
export const DashCard = ({status}) => {
  const cardstyle = {marginBottom: 15, fontSize: 14, height: 200}
  const mockdata = {
    person: 0,
    system: 0
  }
  const result = [
    <Badge status='error' text='系统错误' />,
    <Badge status='success' text='' />,
    <Badge status='error' text='' />,
    <Badge status='error' text='编译错误' />,
    <Badge status='warning' text='部分通过' />,
    <Badge status='success' text='正确' />
  ]
  const {statusTable = []} = status
  const statuslist = (
    <div className='userpage-dashcard-collected-content'>
      {
        statusTable.map((t, i) =>
          i < 4 &&
          <Row
            type='flex'
            justify='start'
            className='userpage-dashcard-status-content'
            key={'userpage-dashcard-status-content' + i}
          >
            <Col className='rank-title' span='8'>
              <Link to={'/status/' + t.id}>
                {t.id}
              </Link>
              </Col>
            <Col className='userpage-dashcard-status-name' span='7'>
              <Link to={'/problems/' + t.problem_id}>
                {t.problem_id}
              </Link>
            </Col>
            <Col className='userpage-dashcard-status-result'> {result[t.result + 1]}</Col>
          </Row>
        )}
    </div>
  )
  return (
    <Row gutter={12} type='flex' className='userpage-dashcard-wrap'>
      <Col className='userpage-dashcard-message' xs={{span: 24}} sm={{span: 8}}>
        <Card title={'通知'} style={cardstyle}>
          <Row type='flex'>
            <Col span='15' className='userpage-dashcard-message-item' onClick={() => console.log(1)}>
              <Link>
                <span>个人消息</span>
                <br />
                <span className='userpage-dashcard-message-item-number'>{mockdata.person}</span>
              </Link>
            </Col>
            <Col span='1' />
            <Col span='8' className='userpage-dashcard-message-item' onClick={() => console.log(2)}>
              <Link>
                <span>系统</span>
                <br />
                <span className='userpage-dashcard-message-item-number'>{mockdata.system}</span>
              </Link>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col className='userpage-dashcard-status' xs={{span: 24}} sm={{span: 8}}>
        <Card title={'最近提交'} style={cardstyle}  extra={(<Link to='/status'>More</Link>)} bodyStyle={{paddingTop: 0, paddingBottom: 3}}>
          <div className='userpage-dashcard-status-wrap'>
            <Row
              type='flex'
              justify='start'
              className='userpage-dashcard-status-title'
              key='userpage-dashcard-status-title'
            >
              <Col className='userpage-dashcard-status-name' span='8'>#</Col>
              <Col className='userpage-dashcard-status-name' span='7'>题目</Col>
              <Col className='userpage-dashcard-status-result'>结果</Col>
            </Row>
            {statuslist}
          </div>
        </Card>
      </Col>
      <Col className='userpage-dashcard-message' xs={{span: 24}} sm={{span: 8}}>
        <Card title={'用户组'} style={cardstyle} extra={'查看更多'}>
          What's this?
        </Card>
      </Col>
    </Row>
  )
}

export default DashCard
