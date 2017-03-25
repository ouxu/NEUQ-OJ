/**
 * Created by out_xu on 17/2/21.
 */
import React from "react";
import {Link} from "react-router";
import QueueAnim from "rc-queue-anim";
import {Table, Progress, Input, Icon, Modal} from "antd";
import "./index.less";
import goto from "../../../utils/goto";
import newDate from "../../../utils/newDate";

const Search = Input.Search;
class ContestPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            presentTime: new Date(),
            visible: false,
            contestId: null,
            password: ''
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onSeacrch = this.onSeacrch.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleok = this.handleok.bind(this);
    }

    componentDidMount() {
        const page = sessionStorage.getItem('neuq_oj.contestspagecurr') || 1;
        const size = sessionStorage.getItem('neuq_oj.contestspagesize') || 20;
        this.props.getContestsTable(page, size);
    }

    onInputChange(e) {
        this.setState({searchText: e.target.value});
    }


    onSeacrch() {
        const searchText = encodeURIComponent(this.state.searchText);
        if (searchText.length < 1) {
            const page = 1;
            const size = sessionStorage.getItem('neuq_oj.contestspagesize');
            this.props.getContestsTable(page, size);
        } else {
            this.props.searchContests(searchText);
        }
    }

    showModal(id, pri) {
        if (pri === 1) {
            this.setState({
                visible: true,
                contestId: id
            });
        } else {
            this.setState({
                contestId: id
            });
            goto(`contests/${id}`);
        }
    }

    handleCancel() {
        this.setState({
            visible: false
        });
    }

    onPasswordChange(e) {
        this.setState({password: e.target.value});
    }

    handleok() {
        const body = {password: this.state.password};
        this.props.joinContest(this.state.contestId, body);
        this.setState({
            visible: false
        });
    }

    render() {
        const {data} = this.props;
        const privatestatus = [
            '公开',
            '加密',
            '私有'
        ];
        const progress = {
            unstart: time => (
                <div>
                    <Progress
                        percent={0}
                        status="active"
                        strokeWidth={5}
                        className="contests-status-progress"
                    />
                    未开始 @ {time}
                </div>
            ),
            running: (time, start_time, end_time) => (
                <div>
                    <Progress
                        status="active"
                        percent={parseInt(100 * (this.state.presentTime - start_time) / (end_time - start_time))}
                        strokeWidth={5}
                        className="contests-status-progress"
                        format={percent => percent}
                    />
                    进行中 @ {time}
                </div>
            ),
            ended: time => (
                <div>
                    <Progress
                        percent={100}
                        status="success"
                        strokeWidth={5}
                        className="contests-status-progress"
                    />
                    已结束 @ {time}
                </div>
            )
        };

        const columns = [{
            title: '',
            width: '1%',
            key: 'status-none',
            className: 'status-none'
        }, {
            title: '#',
            render: (record) => {
                const start_time = newDate(record.start_time);
                const start_status = (this.state.presentTime > start_time);
                return start_status ?
                    (<span>
                      <Link to={`contests/${record.id}`}> {record.id}</Link>
                    </span>
                    ) : (<span>{record.id}</span>);
            },
            width: '7%',
            key: 'contests-id',
            className: 'contests-id'
        }, {
            title: '标题',
            render: (record) => {
                const start_time = newDate(record.start_time);
                const start_status = (this.state.presentTime > start_time);
                return start_status ?
                    (<span onClick={this.showModal = this.showModal.bind(this, record.id, record.private)}>
                      <a> {record.title}</a>
                    </span>
                    ) : (<span>{record.title}</span>);
            },
            width: '30%',
            key: 'contests-title',
            className: 'contests-title'
        }, {
            title: '创建者',
            render: record => (
                <span>
          <Link to={`userpage/${record.creator_id}`}> {record.creator_name}</Link>
        </span>
            ),
            width: '10%',
            key: 'contests-creator-name'
        }, {
            title: '状态',
            render: (record) => {
                const start_time = newDate(record.start_time);
                const end_time = newDate(record.end_time);
                const start_status = (this.state.presentTime < start_time);
                const end_status = (this.state.presentTime > end_time);
                return (
                    <div>
                        {start_status ? progress.unstart(record.start_time) : ''}
                        {(start_status === false && end_status === false) ? progress.running(record.end_time, start_time, end_time) : ''}
                        {end_status ? progress.ended(record.end_time) : ''}
                    </div>
                );
            },

            width: '45%',
            key: 'contests-status',
            className: 'contests-status'

        }, {
            title: '权限',
            // TODO private解释
            render: record =>
                (<span>
                  {privatestatus[record.private]}
                </span>),
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
                    this.props.getContestsTable(current, pageSize);
                } else {
                    this.props.searchContests(searchText, current, pageSize);
                }
            },
            onChange: (current) => {
                sessionStorage.setItem('neuq_oj.contestspagecurr', current);
                const searchText = encodeURIComponent(this.state.searchText);
                const pageSize = sessionStorage.getItem('neuq_oj.contestspagesize', pageSize);
                if (searchText.length < 1) {
                    this.props.getContestsTable(current, pageSize);
                } else {
                    this.props.searchContests(searchText, current, pageSize);
                }
            }

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
                <Modal
                    title="请输入密码"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    width={300}
                    onOk={this.handleok}
                >
                    <Input
                        addonBefore={<Icon type="lock"/>}
                        type="password"
                        placeholder="Password"
                        size="large"
                        onChange={this.onPasswordChange}
                    />

                </Modal>

            </QueueAnim>
        );
    }
}

export default ContestPage;
