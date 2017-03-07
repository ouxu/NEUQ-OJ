/**
 * Created by out_xu on 17/3/5.
 */
import React from "react";
import {Card, Table, Icon, Col, Row, Button, Timeline,Progress} from "antd";
import QueueAnim from "rc-queue-anim";
import {Link} from "react-router";
import ContestProgress from './contestprogress'
import "./index.less";

class ContestInfo extends React.Component {
    constructor(props) {
        super(props)
    }
    createMarkup = (html) => {
        return {__html: html};
    };


    render() {
        const {contest_info, problem_info}= this.props.data;
        const columns = [{
            title: '',
            width: '1%',
            key: 'contest-info-none',
            className: 'contest-info-none'
        }, {
            title: '状态',
            dataIndex: 'user_status',
            width: '10%',
            key: 'contest-info-status',
            className: 'contest-info-status'
        }, {
            title: '#',
            render: (record) => {
                return (
                    <span>
                         <Link to={'404'}> Problem {String.fromCharCode(parseInt(record.pnum) + 65)} {record.pid}</Link>
                    </span>
                )
            },
            width: '20%',
            key: 'contest-info-code',
            className: 'contest-info-code'
        }, {
            title: '标题',
            render: (record) => {
                return (
                    <span>
                        <Link to={'404'}> {record.title}</Link>
                    </span>
                )
            },
            width: '35%',
            key: 'contest-info-title',
            className: 'contest-info-title'
        }, {
            title: '来源',
            dataIndex: 'source',
            width: '15%',
            key: 'contest-info-source',
            className: 'contest-info-source'
        }, {
            title: '提交',
            dataIndex: 'submit',
            width: '10%',
            key: 'contest-info-submit',
            className: 'contest-info-submit'
        }, {
            title: '正确',
            dataIndex: 'accepted',
            width: '10%',
            key: 'contest-info-accepted',
            className: 'contest-info-accepted'
        }];

        return (
            <Card
                className="contest-info-wrap"
                bodyStyle={{padding: 0}}
            >
                <QueueAnim className="contest-info-wrap" delay={100}>
                    <div className="contest-info-header" key='contest-info-header'>

                        <h1 className="contest-info-header-title">
                            <Link to={'/contests'}>
                                <span> # Contest-</span>
                            </Link>
                            {contest_info.id}
                            <span className="contest-info-header-title-sub">{contest_info.title}</span>
                        </h1>
                        {ContestProgress(contest_info.start_time,contest_info.end_time)}
                        <p dangerouslySetInnerHTML={this.createMarkup(contest_info.description)}/>
                    </div>
                    <Row className="contest-info-content"
                         type="flex"
                         gutter={12}
                         key='contest-info-content'
                    >
                        <Col className="contest-info-content-left" xs={{span: 24}} sm={{span: 16}}>
                            <h2 >题目列表</h2>
                            <Table columns={columns}
                                   rowKey={record => `contest-${record.pid}`}
                                   dataSource={problem_info}
                                   scroll={{x: 680}}
                                //size='small'
                                   pagination={false}
                                   key="result-1"
                                   className="contest-info-content-table"
                            />
                        </Col>
                        <Col className="contest-info-content-right" xs={{span: 24}} sm={{span: 8}}>
                            <h2 >题目状态</h2>
                            <Timeline className="contest-info-content-box">
                                <Timeline.Item>Create by {contest_info.creator_name}</Timeline.Item>
                                <Timeline.Item>Start time @{contest_info.start_time}</Timeline.Item>
                                <Timeline.Item dot={<Icon type="clock-circle-o" style={{fontSize: '16px'}}/>}
                                               color="red"
                                >
                                    Contest is running
                                </Timeline.Item>
                                <Timeline.Item>End time @{contest_info.end_time}</Timeline.Item>
                            </Timeline>


                        </Col>

                    </Row>

                </QueueAnim>
            </Card>
        )
    }
}

export default ContestInfo;