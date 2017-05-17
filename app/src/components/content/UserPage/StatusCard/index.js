/**
 * Created by out_xu on 17/2/20.
 */
import React from 'react'
import { Card, Col, Row } from 'antd'
import './index.less'

class Statuscard extends React.Component {
  render () {
    const userdata = this.props.userdata
    const passrate = userdata.submit ? (100 * userdata.solved / userdata.submit).toFixed(2) : '0'
    return (
      <Card>
        <Row gutter={12} type='flex' className='userpage-statuscard-wrap'>
          <Col className='userpage-statuscard-row' xs={{span: 16}} sm={{span: 8}}>
            <div className='userpage-statuscard-item'>
              <span className='userpage-statuscard-item-title'>学校</span>
              <br />
              <span className='userpage-statuscard-item-number'>{userdata.school}</span>
            </div>
          </Col>

          <Col className='userpage-statuscard-row' xs={{span: 8}} sm={{span: 4}}>
            <div className='userpage-statuscard-item'>
              <span className='userpage-statuscard-item-title'>提交</span>
              <br />
              <span className='userpage-statuscard-item-number'>{userdata.submit}</span>
            </div>
          </Col>
          <Col className='userpage-statuscard-row' xs={{span: 8}} sm={{span: 4}}>

            <div className='userpage-statuscard-item'>
              <span className='userpage-statuscard-item-title'>解决</span>
              <br />
              <span className='userpage-statuscard-item-number'>{userdata.solved}</span>
            </div>
          </Col>
          <Col className='userpage-statuscard-row' xs={{span: 8}} sm={{span: 4}}>
            <div className='userpage-statuscard-item'>
              <span className='userpage-statuscard-item-title'>错误</span>
              <br />
              <span className='userpage-statuscard-item-number'>{userdata.submit - userdata.solved}</span>
            </div>
          </Col>
          <Col className='userpage-statuscard-row' xs={{span: 8}} sm={{span: 4}}>
            <div className='userpage-statuscard-item'>
              <span className='userpage-statuscard-item-title'>正确率</span>
              <br />
              <span className='userpage-statuscard-item-number'>{passrate} %</span>
            </div>
          </Col>

        </Row>
      </Card>
    )
  }
}

export default Statuscard
