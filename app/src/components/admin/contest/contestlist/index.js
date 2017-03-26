/**
 * Created by out_xu on 17/3/26.
 */
import React, {Component} from "react";

class ContestList extends Component {
    render() {

        const columns = [{
            title: '',
            width: '1%',
            key: 'home-manage',
            className: 'home-manage-none'
        }, {
            title: 'No.',
            dataIndex: 'num',
            key: 'home-manage-num',
            className: 'home-manage-num'
        }, {
            title: '标题',
            dataIndex: 'title',
            key: 'home-manage-title',
            width: 300,
            className: 'home-manage-title'
        }, {
            title: '创建者',
            dataIndex: 'author',
            key: 'home-manage-author',
            className: 'home-manage-author'
        }, {
            title: '修改时间',
            dataIndex: 'date',
            key: 'home-manage-update',
            className: 'home-manage-update'
        }, {
            title: '创建时间',
            dataIndex: 'date',
            key: 'home-manage-date',
            className: 'home-manage-date'
        }, {
            title: '操作',
            render: (text, record) => (
                <span>
                  <a href="#">修改</a>
                  <span className="ant-divider"/>
                  <a href="#">删除</a>
                </span>
            ),
            width: 100,
            key: 'home-manage-action',
            className: 'home-manage-action'
        }];
        return (
            <div className="title">
                竞赛列表
            </div>
        );
    }
}


export default ContestList;
