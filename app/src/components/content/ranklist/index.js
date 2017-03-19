/**
 * Created by out_xu on 17/2/21.
 */
import React, {Component} from "react";
import {Link} from "react-router";
import QueueAnim from "rc-queue-anim";
import {Table} from "antd";
import "./index.less";
import {TimeSelect} from "../../../utils/selectBox";

//TODO 去除分页

class RankList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scope: null
        };
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        let page = sessionStorage.getItem("neuq_oj.ranklistpagecurr") || 1;
        let size = sessionStorage.getItem("neuq_oj.ranklistpagesize") || 20;
        this.props.getRankTable(page, size);
    }

    handleChange(value) {
        this.setState({
            scope: value
        });
        let page = 1;
        let size = sessionStorage.getItem("neuq_oj.ranklistpagesize") || 20;
        this.props.getRankTable(value, page, size);
    }

    render() {
        let {data = []}= this.props;
        data = data.map((t = {}, i) => {
            return {
                ...t,
                num: i + 1
            }
        });
        const pagination = {
            pageSize: Number(sessionStorage.getItem('neuq_oj.ranklistpagesize')),
            current: Number(sessionStorage.getItem('neuq_oj.ranklistpagecurr')),
            total: 10000,
            showSizeChanger: true,
            onShowSizeChange: (current, pageSize) => {
                const scope = this.state;
                if (scope.length < 1) {
                    this.props.getRankTable(current, pageSize)
                } else {
                    this.props.getRankTable(scope, current, pageSize)
                }
            },
            onChange: (current) => {
                const scope = this.state;
                sessionStorage.setItem("neuq_oj.ranklistpagecurr", current);
                const pageSize = sessionStorage.getItem("neuq_oj.ranklistpagesize", pageSize);
                if (scope.length < 1) {
                    this.props.getRankTable(current, pageSize)
                } else {
                    this.props.getRankTable(scope, current, pageSize)
                }
            }
        };

        const columns = [{
            title: '',
            width: '1%',
            key: 'ranklist',
            className: 'ranklist-none'
        }, {
            title: '排名',
            dataIndex: 'num',
            key: 'ranklist-rank',
            className: 'ranklist-rank'
        }, {
            title: '用户',
            render: (record) => {
                return (
                    <span>
                        <Link to={`userpage/${record.id}`}> {record.name}</Link>
                    </span>
                )
            },
            key: 'ranklist-user',
            className: 'ranklist-user'
        }, {
            title: 'ID',
            render: (record) => {
                return (
                    <span>
                        <Link to={`userpage/${record.id}`}> {record.id}</Link>
                    </span>
                )
            },
            key: 'ranklist-id',
            className: 'ranklist-id'
        }, {
            title: '解决',
            dataIndex: 'solved',
            key: 'ranklist-solved',
            className: 'ranklist-solved'
        }, {
            title: '提交',
            dataIndex: 'submit',
            width: 80,
            key: 'ranklist-submit',
            className: 'ranklist-submit'
        }];

        return (
            <div>
                <QueueAnim className="rank-table-warp" delay={100}>
                    <div className="rank-table-header" key="status-2">
                        <span className="rank-table-header-title">排行榜</span>

                        <div className="rank-table-header-other">
                            <TimeSelect handleChange={this.handleChange}/>
                        </div>
                    </div>
                    <Table columns={columns}
                           rowKey={record => {
                               return `rank-table-${record.id}`
                           }}
                           dataSource={data}
                           scroll={{x: 680}}
                           pagination={pagination}
                           key="rank-table-table"
                           className="rank-table-table"
                    />
                </QueueAnim>

            </div>
        );
    }
}

RankList.propTypes = {};
RankList.defaultProps = {};

export default RankList;
