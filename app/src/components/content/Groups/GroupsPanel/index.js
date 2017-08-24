import React, { Component } from 'react'
import { Card, Col,Row } from 'antd'
import './index.less'
class GroupsPanel extends Component {
  componentDidMount () {
    this.props.getGroupJoined()
  }

  render () {
    return (
      <div className='group-panel'>
        <Row gutter={16}>
          <Col xs={24} sm={6} >
            <Card bordered={false} bodyStyle={{padding: '24px 36px 24px 36'}} className='group-panel-item'>
              <div className='group-panel-notice-title'>公告栏</div>
              aa
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card bordered={false} bodyStyle={{padding: '24px 36px 24px 36'}} className='group-panel-item'>
              <div className='group-panel-notice-title'>公告栏</div>
              aa
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card bordered={false} bodyStyle={{padding: '24px 36px 24px 36'}} className='group-panel-item'>
              <div className='group-panel-notice-title'>公告栏</div>
              aa
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card bordered={false} bodyStyle={{padding: '24px 36px 24px 36'}} className='group-panel-item'>
              <div className='group-panel-notice-title'>公告栏</div>
              aa
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card bordered={false} bodyStyle={{padding: '24px 36px 24px 36'}} className='group-panel-item'>
              <div className='group-panel-notice-title'>公告栏</div>
              aa
            </Card>
          </Col>
        </Row>

      </div>
    )
  }
}

export default GroupsPanel
