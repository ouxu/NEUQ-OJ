/**
 * Created by out_xu on 16/12/23.
 */
import React from 'react';

import { Row, Col } from 'antd';
import QueueAnim from 'rc-queue-anim';

// 连接redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchHomePageData, getRankTable } from '../actions';

// 导入子组件
import HomeNews from '../components/content/homepage/notice';
import Introduce from '../components/content/homepage/introduce';
import HomeRank from '../components/content/homepage/homerank';

@connect(
    state => ({
        home: state.home,
        ranklist: state.ranklist
    }),
    dispatch => bindActionCreators({ fetchHomePageData,getRankTable }, dispatch),
)
class HomepageContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchHomePageData();
    this.props.getRankTable(1,10);
  }

  render() {
    const { home:{home},home:{news}} = this.props;
    const { ranklist:{ranklist = []}} = this.props;
    const { introduce = []} = home;
    return (
      <Row gutter={12} type="flex" className="homepage">
        <Col className="left-content" xs={{ span: 24 }} sm={{ span: 16 }}>
          <QueueAnim delay={100} interval={200}>
            <div key="homepage-1" >
              <HomeNews notice={news}/>
            </div>
            <Introduce introduce={introduce} key="homepage-2" />
          </QueueAnim>
        </Col>
        <Col className="right-content" xs={{ span: 24 }} sm={{ span: 8 }} >
          <QueueAnim delay={400} type="bottom">
            <HomeRank data={ranklist} key="homepage-3" />
          </QueueAnim>
        </Col>
      </Row>
    );
  }
}


export default HomepageContainer;
