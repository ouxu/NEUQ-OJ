/**
 * Created by out_xu on 17/2/20.
 */
import React from 'react'
import { Card, Col, Row } from 'antd'
import './index.less'

export const DashCard = () => {
  const cardstyle = {marginBottom: 15, fontSize: 14, height: 200}
  const mockdata = {
    person: 0,
    system: 0,
    data: [
      {
        id: 1001,
        title: 'A+B（基本输入输出1）',
        difficulty: 2,
        source: '',
        submit: 3325,
        accepted: 1753,
        is_public: 1,
        created_at: '2014-01-17 00:18:19',
        updated_at: null,
        tags: [
          {
            problem_id: 1001,
            tag_id: 1,
            tag_title: 'basic'
          }
        ],
        user_status: 'N'
      },
      {
        id: 1002,
        title: 'A+B（基本输入输出2）',
        difficulty: 2,
        source: '',
        submit: 1048,
        accepted: 702,
        is_public: 1,
        created_at: '2014-01-17 00:23:13',
        updated_at: null,
        tags: null,
        user_status: 'Y'
      },
      {
        id: 1003,
        title: 'A+B（基本输入输出3）',
        difficulty: 2,
        source: '',
        submit: 1939,
        accepted: 1061,
        is_public: 1,
        created_at: '2014-01-17 16:22:46',
        updated_at: null,
        tags: null,
        user_status: 'N'
      },
      {
        id: 1004,
        title: 'A+B（基本输入输出4）',
        difficulty: 2,
        source: '',
        submit: 783,
        accepted: 493,
        is_public: 1,
        created_at: '2014-01-17 01:44:40',
        updated_at: null,
        tags: null,
        user_status: 'Y'
      },
      {
        id: 1005,
        title: 'A+B（基本输入输出5）',
        difficulty: 2,
        source: '',
        submit: 1240,
        accepted: 880,
        is_public: 1,
        created_at: '2014-01-17 01:52:18',
        updated_at: null,
        tags: null,
        user_status: 'Y'
      },
      {
        id: 1007,
        title: 'C基础-计负均正',
        difficulty: 2,
        source: '',
        submit: 1064,
        accepted: 526,
        is_public: 1,
        created_at: '2012-09-29 17:43:11',
        updated_at: null,
        tags: null,
        user_status: 'Y'
      },
      {
        id: 1008,
        title: 'C基础-公约公倍',
        difficulty: 2,
        source: '',
        submit: 842,
        accepted: 532,
        is_public: 1,
        created_at: '2014-10-13 22:35:15',
        updated_at: null,
        tags: null,
        user_status: 'Y'
      }
    ]
  }
  const collectedlist = (
    <div className='userpage-dashcard-collected-content'>
      {
        mockdata.data.map((t, i) =>
          i < 5 &&
          <Row type='flex' justify='space-between' align='middle' className='rank-title' key={i + 500}>
            <Col className='rank-title' span='4'>{t.id}</Col>
            <Col className='userpage-dashcard-collected-name' span='16'> {t.title}</Col>
            <Col className='rank-id' span='2'/>
            <Col className='rank-pass' span='2'/>
            <Col className='rank-rate' span='2'/>
          </Row>,
        )}
    </div>
  )
  return (
    <Row gutter={12} type='flex' className='userpage-dashcard-wrap'>
      <Col className='userpage-dashcard-message' xs={{span: 24}} sm={{span: 8}}>
        <Card title={'通知'} style={cardstyle}>
          <Row type='flex'>
            <Col span='15' className='userpage-dashcard-message-item'>
              <span>个人消息</span>
              <br />
              <span className='userpage-dashcard-message-item-number'>{mockdata.person}</span>
            </Col>
            <Col span='1'/>
            <Col span='8' className='userpage-dashcard-message-item'>
              <span>系统</span>
              <br />
              <span className='userpage-dashcard-message-item-number'>{mockdata.system}</span>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col className='userpage-dashcard-collected' xs={{span: 24}} sm={{span: 8}}>
        <Card title={'题目收藏'} style={cardstyle} bodyStyle={{paddingTop: 0, paddingBottom: 3}}>
          <div className='userpage-dashcard-collected-wrap'>
            <Row type='flex' justify='space-between' align='middle'
                 className='userpage-dashcard-collected-title userpage-dashcard-collected-content' key={400}>
              <Col className='rank-title' span='4'> #</Col>
              <Col className='rank-title' span='16'> 题目</Col>
              <Col className='rank-id' span='2'/>
              <Col className='rank-pass' span='2'/>
              <Col className='rank-rate' span='2'/>
            </Row>
            {collectedlist}
          </div>
        </Card>
      </Col>
      <Col className='userpage-dashcard-message' xs={{span: 24}} sm={{span: 8}}>
        <Card title={'用户组'} style={cardstyle}>
          What's this?
        </Card>
      </Col>
    </Row>
  )
}

export default DashCard
