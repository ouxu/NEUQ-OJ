/**
 * Created by out_xu on 17/3/11.
 */
import React from "react";
import {Link} from "react-router";
import {Table} from "antd";
import "./index.less";
import newDate from "../../../../../utils/newDate";
import sec2Str from "../../../../../utils/sec2Str";
import colorEncode from "../../../../../utils/colorEncode";


class ContestInfoTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            loading: false
        }
    }

    componentWillMount() {
        this.setState({loading: true});
        this.props.getRank(this.props.id);

        this.timer = setInterval(() => {
            this.props.getRank(this.props.id);
            const end = newDate(this.props.end_time);
            if (this.props.time > end) {
                clearInterval(this.timer);
            }
        }, 30000);
        setTimeout(() => {
            this.setState({loading: false});
        }, 1000);
    }

    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearInterval(this.timer);
    }

    render() {
        let {rankData = [], count_num} = this.props;
        // 给rankData添加索引
        rankData = rankData.map((t = {}, i) => ({
            ...t,
            id: i + 1
        }));

        const columns = [{
            title: '',
            width: '1%',
            key: 'contest-info-none',
            className: 'contest-info-none'
        }, {
            title: '排名',
            dataIndex: 'id',
            key: 'contest-info-rank',
            className: 'contest-info-rank'
        }, {
            title: '用户',
            render: record => (
                <span>
                  <Link to={`userpage/${record.user_id}`}> {record.user_name}</Link>
                </span>
            ),
            key: 'contest-info-user',
            className: 'contest-info-user'
        }, {
            title: 'ID',
            render: record => (
                <span>
          <Link to={`userpage/${record.user_id}`}> {record.user_id}</Link>
        </span>
            ),
            key: 'contest-info-id',
            className: 'contest-info-id'
        }, {
            title: '解决',
            dataIndex: 'solved',
            key: 'contest-info-solved',
            className: 'contest-info-solved'
        }, {
            title: '用时',
            render: (record) => {
                return <span>{sec2Str(record.time)}</span>
            },
            key: 'contest-info-time',
            className: 'contest-info-time'
        }];
        for (let i = 0; i < count_num; i++) {
            columns.push({
                title: String.fromCharCode(parseInt(i) + 65),
                render: (record) => {
                    return colorEncode(record,i)
                },
                key: 'contest-info-problem-' + i,
                className: 'contest-info-problem'
            })
        }
        return (
            <Table
                columns={columns}
                rowKey={record => `contest-info-${record.id}`}
                dataSource={rankData}
                scroll={{x: 680}}
                // size='small'
                loading={this.state.loading}
                pagination={false}
                key="contest-info-content-rank"
                className="contest-info-content-table"
            />
        );
    }

}

export default ContestInfoTabs;
