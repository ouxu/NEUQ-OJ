/**
 * Created by out_xu on 17/2/21.
 */
import React from "react";
import {Link} from "react-router";
import QueueAnim from "rc-queue-anim";
import {Table, Progress, Input} from "antd";
import "./index.less";

const Search = Input.Search;
class ContestPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            presentTime: ''
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.onSeacrch = this.onSeacrch.bind(this)
    }

    componentWillMount() {
        let page = sessionStorage.getItem("neuq_oj.contestspagecurr")||1;
        let size = sessionStorage.getItem("neuq_oj.contestspagesize")||20;
        this.props.getContestsTable(page, size);

        let presentTime = new Date();
        this.setState({
            presentTime: presentTime
        })
    }

    onInputChange(e) {
        this.setState({searchText: e.target.value})
    }

    onSeacrch() {
        const searchText = encodeURIComponent(this.state.searchText);
        if (searchText.length < 1) {
            let page = 1;
            let size = sessionStorage.getItem("neuq_oj.contestspagesize");
            this.props.getContestsTable(page, size);
        } else {
            this.props.searchContests(searchText)
        }
    }

    render() {
        const {data}=this.props;
        const progress = {
            unstart: (time) => (
                <div>
                    <Progress
                        percent={0}
                        status="active"
                        strokeWidth={5}
                        className='contests-status-progress'
                    />
                    未开始 @ {time}
                </div>
            ),
            running: (time, start_time, end_time) => (
                <div>
                    <Progress
                        active
                        percent={parseInt(100 * (end_time - this.state.presentTime) / (end_time - start_time))}
                        strokeWidth={5}
                        className='contests-status-progress'
                    />
                    进行中 @ {time}
                </div>
            ),
            ended: (time) => (
                <div>
                    <Progress
                        percent={100}
                        status="success"
                        strokeWidth={5}
                        className='contests-status-progress'
                    />
                    已结束 @ {time}
                </div>
            )
        }
        const columns = [{
            title: '',
            width: '1%',
            key: 'status-none',
            className: 'status-none'
        }, {
            title: '#',
            render: (record) => (
                <span>
                    <Link to={`contests/${record.id}`}> {record.id}</Link>
                </span>
            ),
            width: '7%',
            key: 'contests-id',
            className: 'contests-id'
        }, {
            title: '标题',
            render: (record) => (
                <span>
                    <Link to={`contests/${record.id}`}> {record.title}</Link>
                </span>
            ),
            width: '30%',
            key: 'contests-title',
            className: 'contests-title'
        }, {
            title: '创建者',
            render: (record) => (
                <span>
                    <Link to={`userpage/${record.creator_id}`}> {record.creator_name}</Link>
                </span>
            ),
            width: '10%',
            key: 'contests-creator-name'
        }, {
            title: '状态',
            //TODO private解释
            render: (record) => {
                const start_time = new Date(record.start_time)
                const end_time = new Date(record.end_time)
                const start_status = (this.state.presentTime < start_time)
                const end_status = (this.state.presentTime > end_time)
                return (
                    <div>
                        {start_status ? progress.unstart(record.start_time) : ''}
                        {(start_status === false && end_status === false) ? progress.running(record.end_time, start_time, end_time) : ''}
                        {end_status ? progress.ended(record.end_time) : ''}
                    </div>
                )
            }

            ,
            width: '45%',
            key: 'contests-status',
            className: 'contests-status'

        }, {
            title: '权限',
            //TODO private解释
            render: (record) =>
                (<span>
                    {record.private ? '私有' : '公开'}
                </span>)
            ,
            width: '8%',
            key: 'contests-private',
            className: 'contests-private'

        }];
        const pagination = {
            pageSize: Number(sessionStorage.getItem('neuq_oj.contestspagesize')),
            current: Number(sessionStorage.getItem('neuq_oj.contestspagecurr')),
            total: Number(sessionStorage.getItem('neuq_oj.contestspagecount')),
            showSizeChanger: true,
            onShowSizeChange: (current, pageSize) => {
                const searchText = encodeURIComponent(this.state.searchText);
                if (searchText.length < 1) {
                    this.props.getContestsTable(current, pageSize)
                } else {
                    this.props.searchContests(searchText, current, pageSize)
                }

            },
            onChange: (current) => {
                sessionStorage.setItem("neuq_oj.contestspagecurr", current)
                const searchText = encodeURIComponent(this.state.searchText);
                const pageSize = sessionStorage.getItem("neuq_oj.contestspagesize", pageSize)
                if (searchText.length < 1) {
                    this.props.getContestsTable(current, pageSize)
                } else {
                    this.props.searchContests(searchText, current, pageSize)
                }
            },

        };
        return (
            <QueueAnim className="contests-table-wrap" delay={100}>
                <div className="contests-table-header" key="contests-1">
                    <span className="contests-table-header-title">
                       竞赛列表
                    </span>
                    <div>
                        <Search
                            placeholder="标题"
                            value={this.state.searchText}
                            onChange={this.onInputChange}
                            onPressEnter={this.onSeacrch}
                            onSearch={this.onSeacrch}
                        />
                    </div>
                </div>
                <Table
                    columns={columns}
                    rowKey={record => `contests-${record.id}`}
                    dataSource={data}
                    scroll={{x: 768}}
                    pagination={pagination}
                    key="contests-2"
                />

            </QueueAnim>
        )
    }
}

export default ContestPage;