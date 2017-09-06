import React, { Component } from 'react'
import { Card, Col } from 'antd'
import './index.less'
class GroupsPanel extends Component {

  render () {
    return (
      <div className='group-panel'>
        <Col xs={24} sm={18}>
          <Card bordered={false} bodyStyle={{padding: '24px 36px 24px 36'}} className='group-panel-notice'>
            <div className='group-panel-notice-title'>公告栏</div>
            aa
          </Card>
        </Col>
        <Col xs={24} sm={6}>
        </Col>

      </div>
    )
  }
}

export default GroupsPanel
