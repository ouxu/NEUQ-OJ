/**
 * Created by out_xu on 17/3/11.
 */
import React from "react";
import {Link} from "react-router";
import {Table, Icon} from "antd";
import "./index.less";
import newDate from "../../../../../utils/newDate";


class ContestInfoTabs extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getRank(this.props.id);

        this.timer = setInterval(() => {
            this.props.getRank(this.props.id);
            const end = newDate(this.props.end_time);
            if (this.props.time > end) {
                clearInterval(this.timer);
            }
        }, 10000)
    }

    render() {
        let {rankData = []}= this.props;
        //给rankData添加索引
        rankData = rankData.map((t = {}, i) => {
            return {
                ...t,
                id: i + 1
            }
        });
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
            title: '排名',
            dataIndex: 'id',
            width: '10%',
            key: 'contest-info-rank',
            className: 'contest-info-rank'
        }, {
            title: '用户',
            render: (record) => {
                return (
                    <span>
                        <Link to={`userpage/${record.user_id}`}> {record.user_name}</Link>
                    </span>
                )
            },
            width: '20%',
            key: 'contest-info-user',
            className: 'contest-info-user'
        }, {
            title: 'ID',
            render: (record) => {
                return (
                    <span>
                        <Link to={`userpage/${record.user_id}`}> {record.user_id}</Link>
                    </span>
                )
            },
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
                const addZore = (t) => t ; //> 9 && t || t + '0'
                let h = addZore(Math.floor(record.time / 60 / 60));
                let m = addZore(Math.floor((record.time - h * 60 * 60) / 60));
                let s = addZore(Math.floor((record.time - h * 60 * 60 - m * 60)));
                return (
                    <span>
                        {h} : {m} : {s}
                    </span>
                )
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
            <div>
                <Table columns={columns}
                       rowKey={record => {
                           return `contest-info-${record.id}`
                       }}
                       dataSource={rankData}
                       scroll={{x: 680}}
                    //size='small'
                       pagination={false}
                       key="contest-info-content-rank"
                       className="contest-info-content-table"
                />
            </div>
        );
    }

}

export default ContestInfoTabs;