/**
 * Created by out_xu on 16/12/23.
 */
import React from 'react'
import {Link} from 'react-router'
import {Card, Row, Col} from 'antd'
import './index.less'

class HomeRank extends React.Component {
  render () {
    const {data} = this.props

    const homerank = (
      <div className='home-rank-ranklist-content'>
        {
                    data.length > 0 && data.map((t, i) =>
                        i < 9 &&
                        <Row type='flex' justify='space-between' align='middle' className='rank-title' key={i + 500}>
                          <Col className='rank-title' span='4'>{i + 1}</Col>
                          <Col className='rank-name' span='8'> <Link to={`userpage/${t.id}`}>{t.name}</Link></Col>
                          <Col className='rank-submit' span='4'>{t.submit}</Col>
                          <Col className='rank-pass' span='4'>{t.solved}</Col>
                          <Col className='rank-rate' span='4'>{parseInt(100 * (t.solved / t.submit))}%</Col>
                        </Row>,
                    )}
      </div>
        )
    return (
      <div className='home-rank'>
        {
                    // 数据加载完才渲染
                    data.length > 0 &&
                    <Card title='排行榜' style={{marginBottom: 15}} bodyStyle={{padding: 0}} key={300}
                      className=' home-rank-ranklist'>
                      <div className='home-rank-ranklist-wrap'>
                        <Row type='flex' justify='space-between' align='middle'
                          className='home-rank-ranklist-title home-rank-ranklist-content' key={400}>
                          <Col className='rank-title' span='4'> No.</Col>
                          <Col className='rank-name' span='8'> <a href='#'>昵称</a></Col>
                          <Col className='rank-submit' span='4'><a href='#'>提交</a></Col>
                          <Col className='rank-pass' span='4'>正确</Col>
                          <Col className='rank-rate' span='4'>AC率</Col>
                        </Row>
                        {homerank}
                      </div>

                    </Card>

                }
      </div>
    )
  }
}

export default HomeRank
