/**
 * Created by out_xu on 16/12/23.
 */
import React from 'react'

import { Carousel, Col, Row } from 'antd'
import QueueAnim from 'rc-queue-anim'
// 连接redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchHomePageData, getContestsTable, getRankTable, getStatusTable } from '../actions'
// 导入子组件
import HomeNews from '../components/content/homepage/homenews'
import HomeRank from '../components/content/homepage/homerank'
import HomeStatus from '../components/content/homepage/homestatus'

@connect(
  state => ({
    home: state.home,
    ranklist: state.ranklist,
    loading: state.loading,
    status: state.status,
    contests: state.contests
  }),
  dispatch => bindActionCreators({fetchHomePageData, getRankTable, getStatusTable, getContestsTable}, dispatch),
)
class HomepageContainer extends React.Component {
  componentDidMount () {
    this.props.fetchHomePageData()
    this.props.getRankTable()
    this.props.getStatusTable()
    this.props.getContestsTable()
  }

  render () {
    const {home: {news}, ranklist: {ranklist = []}, status: {statustable}, contests: {conteststable}} = this.props
    const {latest_news = [], fixed_news = []} = news

    return (
      <Row gutter={12} type='flex' className='homepage'>
        <Col className='left-content' xs={{span: 24}} sm={{span: 16}}>
          <QueueAnim delay={100} interval={200}>
            <div key='homepage-news'><HomeNews news={latest_news} /></div>
            <div key='homepage-news-fixed'><HomeNews news={fixed_news} /></div>
          </QueueAnim>
        </Col>
        <Col className='right-content' xs={{span: 24}} sm={{span: 8}}>
          <QueueAnim delay={200} type='bottom'>
            <Carousel autoplay dots={false} key='homepage-rank'>
              <div><HomeRank data={ranklist} /></div>
              <div><HomeStatus data={statustable} /></div>
            </Carousel>
          </QueueAnim>
        </Col>
      </Row>
    )
  }
}

export default HomepageContainer
