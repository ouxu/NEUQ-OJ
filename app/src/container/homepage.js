/**
 * Created by out_xu on 16/12/23.
 */
import React from 'react';

import { Row, Col } from 'antd';
import QueueAnim from 'rc-queue-anim';

//连接redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchHomePageData} from '../actions';

// 导入子组件
import HomeItem from '../components/content/homepage/notice';
import Introduce from '../components/content/homepage/introduce';
import HomeRank from '../components/content/homepage/homerank'

class HomepageContainer extends React.Component {
    constructor(props){
        super(props);
    }

    componentWillMount() {
        this.props.action.fetchHomePageData();
    }

    render() {
        const {home} = this.props;
        const {notice=[],introduce=[],home_rank=[]}=home
        return (
            <Row gutter={12} type="flex" className="homepage">
                <Col className="left-content" xs={{span: 24}} sm={{span:16}}>
                    <QueueAnim delay={100} interval={200}>
                        <div key="homepage-1" >
                            <HomeItem notice={notice}
                                      type={{item:'notice',title:'通知'}}
                            />
                        </div>
                        <Introduce introduce={introduce} key="homepage-2"/>
                    </QueueAnim>
                </Col>
                <Col className="right-content" xs={{span: 24}} sm={{span:8}} >
                    <QueueAnim delay={400} type="bottom">
                        <HomeRank home_rank={home_rank} key="homepage-3"/>
                    </QueueAnim>
                </Col>
            </Row>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        home: state.home
    }
};

const mapDispatchToProps=(dispatch)=>{
    const actions= {fetchHomePageData};
    const actionMap = {action: bindActionCreators(actions, dispatch)}
    return actionMap;
};

export default connect(mapStateToProps,mapDispatchToProps)(HomepageContainer);