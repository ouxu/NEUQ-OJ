/**
 * Created by out_xu on 17/3/11.
 */
import React from "react";
import {Link} from "react-router";
import {Table} from "antd";
import "./index.less";
import newDate from "../../../../../utils/newDate";


class ContestInfoTabs extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getRank(this.props.id);

        this.timer = setInterval(() => {
            this.props.getRank(this.props.id);
            const end = newDate(this.props.end_time);
            if (this.props.time > end) {
                clearInterval(this.timer);
            }
        }, 10000);
    }

    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearInterval(this.timer);
    }

    render() {
        let {rankData = []} = this.props;
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
            width: '10%',
            key: 'contest-info-rank',
            className: 'contest-info-rank'
        }, {
            title: '用户',
            render: record => (
                <span>
          <Link to={`userpage/${record.user_id}`}> {record.user_name}</Link>
        </span>
            ),
            width: '20%',
            key: 'contest-info-user',
            className: 'contest-info-user'
        }, {
            title: 'ID',
            render: record => (
                <span>
          <Link to={`userpage/${record.user_id}`}> {record.user_id}</Link>
        </span>
            ),
            width: '20%',
            key: 'contest-info-id',
            className: 'contest-info-id'
        }, {
            title: '解决',
            dataIndex: 'solved',
            width: '15%',
            key: 'contest-info-solved',
            className: 'contest-info-solved'
        }, {
            title: '用时',
            render: (record) => {
                const addZore = t => t; // > 9 && t || t + '0'
                const h = addZore(Math.floor(record.time / 60 / 60));
                const m = addZore(Math.floor((record.time - h * 60 * 60) / 60));
                const s = addZore(Math.floor((record.time - h * 60 * 60 - m * 60)));
                return (
                    <span>
            {h} : {m} : {s}
          </span>
                );
            },
            width: '10%',
            key: 'contest-info-time',
            className: 'contest-info-time'
        }, {
            title: '正确',
            // dataIndex: 'accepted',
            width: '10%',
            key: 'contest-info-accepted',
            className: 'contest-info-accepted'
        }];

        return (
            <Table
                columns={columns}
                rowKey={record => `contest-info-${record.id}`}
                dataSource={rankData}
                scroll={{x: 680}}
                // size='small'
                pagination={false}
                key="contest-info-content-rank"
                className="contest-info-content-table"
            />
        );
    }

}

export default ContestInfoTabs;
