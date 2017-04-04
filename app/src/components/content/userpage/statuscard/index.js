/**
 * Created by out_xu on 17/2/20.
 */
import React from 'react'
import { Row, Col, Card } from 'antd'
import './index.less'

class Statuscard extends React.Component {
  render () {
    const userdata = this.props.userdata
    const passrate = (100 * userdata.solved / userdata.submit).toFixed(2)
    return (
      <Card>
        <Row gutter={12} type='flex' className='userpage-statuscard-wrap'>
          <Col className='userpage-statuscard-row' xs={{ span: 8 }} sm={{ span: 4 }}>
            <div className='userpage-statuscard-item'>
              <span className='userpage-statuscard-item-title'>名次</span>
              <br />
              <span className='userpage-statuscard-item-number'>{userdata.submit - 100}</span>
            </div>
          </Col>
          <Col className='userpage-statuscard-row' xs={{ span: 8 }} sm={{ span: 4 }}>
            <div className='userpage-statuscard-item'>
              <span className='userpage-statuscard-item-title'>提交</span>
              <br />
              <span className='userpage-statuscard-item-number'>{userdata.submit}</span>
            </div>
          </Col>
          <Col className='userpage-statuscard-row' xs={{ span: 8 }} sm={{ span: 4 }}>

            <div className='userpage-statuscard-item'>
              <span className='userpage-statuscard-item-title'>解决</span>
              <br />
              <span className='userpage-statuscard-item-number'>{userdata.solved}</span>
            </div>
          </Col>
          <Col className='userpage-statuscard-row' xs={{ span: 8 }} sm={{ span: 4 }}>
            <div className='userpage-statuscard-item'>
              <span className='userpage-statuscard-item-title'>正确率</span>
              <br />
              <span className='userpage-statuscard-item-number'>{passrate} %</span>
            </div>
          </Col>
          <Col className='userpage-statuscard-row' xs={{ span: 8 }} sm={{ span: 4 }}>
            <div className='userpage-statuscard-item'>
              <span className='userpage-statuscard-item-title'>名次</span>
              <br />
              <span className='userpage-statuscard-item-number'>{userdata.submit - 100}</span>
            </div>
          </Col>
          <Col className='userpage-statuscard-row' xs={{ span: 8 }} sm={{ span: 4 }}>
            <div className='userpage-statuscard-item'>
              <span className='userpage-statuscard-item-title'>提交</span>
              <br />
              <span className='userpage-statuscard-item-number'>{userdata.submit}</span>
            </div>
          </Col>
        </Row>
      </Card>
    )
  }
}

export default Statuscard
