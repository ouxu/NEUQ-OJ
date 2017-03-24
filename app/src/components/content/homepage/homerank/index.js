/**
 * Created by out_xu on 16/12/23.
 */
import React from 'react';
import './index.less';

import { Card, Row, Col } from 'antd';

class HomeRank extends React.Component {
  render() {
    const homerank = (
      <div className="home-rank-ranklist-content">
        {
                    this.props.home_rank.map((t, i) =>
                        i < 9 &&
                        <Row type="flex" justify="space-between" align="middle" className="rank-title" key={i + 500}>
                          <Col className="rank-title" span="4">{i + 1}</Col>
                          <Col className="rank-title" span="8"> <a href="#">{t.user_name}</a></Col>
                          <Col className="rank-id" span="4">{t.id}</Col>
                          <Col className="rank-pass" span="4">{t.passNum}</Col>
                          <Col className="rank-rate" span="4">{t.passRate}%</Col>
                        </Row>,
                    )}
      </div>
        );
    return (
      <div className="home-rank">
        {
                    // 数据加载完才渲染
                    this.props.home_rank.length > 0 &&
                    <Card title="排行榜" style={{ marginBottom: 15 }} bodyStyle={{ padding: 0 }} key={300} className=" home-rank-ranklist">
                      <div className="home-rank-ranklist-wrap">
                        <Row type="flex" justify="space-between" align="middle" className="home-rank-ranklist-title home-rank-ranklist-content" key={400}>
                          <Col className="rank-title" span="4"> No.</Col>
                          <Col className="rank-title" span="8"> <a href="#">昵称</a></Col>
                          <Col className="rank-id" span="4"><a href="#">提交</a></Col>
                          <Col className="rank-pass" span="4">正确</Col>
                          <Col className="rank-rate" span="4">AC率</Col>
                        </Row>
                        {homerank}
                      </div>

                    </Card>

                }
      </div>
    );
  }
}

export default HomeRank;
