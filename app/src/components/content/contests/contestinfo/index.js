/**
 * Created by out_xu on 17/3/5.
 */
import React from "react";
import {Card, Table, Icon, Tabs, Spin} from "antd";
import QueueAnim from "rc-queue-anim";
import {Link} from "react-router";
import ContestProgress from "./contestprogress";
import ContestInfoTabs from "./contestinfotabs";
import "./index.less";
import newDate from "../../../../utils/newDate";
import API from "../../../../api";

const TabPane = Tabs.TabPane;
class ContestInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date(),
            rankData: []
        };
        this.getRank = this.getRank.bind(this)
    }


    componentWillMount() {
        this.timer = setInterval(() => {
            this.setStateAsync({time: new Date()});
            let end_time = newDate(this.props.data.contest_info.end_time);
            if (this.state.time > end_time) {
                clearInterval(this.timer);
            }
        }, 1000)
    }

    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearInterval(this.timer);
    }

    createMarkup = (html) => {
        return {__html: html};
    };

    setStateAsync=(state)=> {
        return new Promise((resolve) => {
            this.setState(state, resolve);
        });
    };

    getRank(id) {
        fetch(API.contest + id + '/ranklist', {
            method: 'GET',
        }).then((res) => {
            return res.json()
        }).then((json) => {
            if (json.code === 0) {
                this.setStateAsync({
                    rankData: json.data,
                });
            } else {
                codeHelper(json.code)
            }
        }).catch((e) => {
            console.log(e.message)
        })
    }

    render() {
        const {contest_info, problem_info}= this.props.data;
        const accepted = {
            Y: <Icon className="status-yes" type="check-circle"/>,
            N: <Icon className="status-no" type="close-circle"/>
        };
        const columns = [{
            title: '',
            width: '1%',
            key: 'contest-info-none',
            className: 'contest-info-none'
        }, {
            title: '状态',
            render: (record) => {
                let status = record.user_status;
                if (status === 'Y')
                    return accepted.Y;
                else if (status === 'N')
                    return accepted.N;
                else
                    return null
            },
            width: '10%',
            key: 'contest-info-status',
            className: 'contest-info-status'
        }, {
            title: '#',
            render: (record) => {
                return (
                    <span>
                         <Link to={'contests/'+this.props.id +'/problem/'+record.pnum}> Problem {String.fromCharCode(parseInt(record.pnum) + 65)} {record.pid}</Link>
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
            <Spin spinning={!(contest_info).hasOwnProperty("id")}>
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
                            {ContestProgress(this.state.time, contest_info.start_time, contest_info.end_time)}
                            <p dangerouslySetInnerHTML={this.createMarkup(contest_info.description)}/>
                        </div>

                        <Tabs defaultActiveKey="contest-info-table"
                              tabPosition="right"
                              className='contest-info-content'
                              key="contest-info-content"
                        >
                            <TabPane tab="题目列表" key="contest-info-table">
                                <Table columns={columns}
                                       rowKey={record => `contest-${record.pid}`}
                                       dataSource={problem_info}
                                       scroll={{x: 680}}
                                    //size='small'
                                       pagination={false}
                                       key="contest-info-content-table"
                                       className="contest-info-content-table"
                                />
                            </TabPane>
                            <TabPane tab="排行榜" key="contest-info-rank">
                                <ContestInfoTabs
                                    getRank={this.getRank}
                                    time={this.state.time}
                                    end_time={contest_info.end_time}
                                    rankData={this.state.rankData}
                                    id={contest_info.id}
                                />

                            </TabPane>
                        </Tabs>

                    </QueueAnim>
                </Card>
            </Spin>

        )
    }
}

export default ContestInfo;