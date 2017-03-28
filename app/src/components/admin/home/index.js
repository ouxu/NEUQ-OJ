import React, {Component} from "react";
import {Button, Icon, Input, Modal, Radio, Table} from "antd";
import "./index.less";

const RadioGroup = Radio.Group;
class HomeManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false,
            value: 1
        };
    }

    showModal = () => {
        this.setState({
            visible: true
        });
    };
    handleOk = () => {
        this.setState({loading: true});
        setTimeout(() => {
            this.setState({loading: false, visible: false});
        }, 3000);
    };
    handleCancel = () => {
        this.setState({visible: false});
    };
    onChange = (e) => {
        this.setState({
            value: e.target.value
        });
    }

    render() {
        let {data: {notice = []}} = this.props;
        notice = notice.map((t = {}, i) => ({
            ...t,
            num: i + 1
        }));
        const title = () => (
            <span className="home-manage-table-title">
                <span>公告列表</span>
                <span className="home-manage-table-title-icon">
                    发布公告 <Icon type="plus-square-o" onClick={this.showModal}/>
                </span>
            </span>
        );
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
                  <a href={record.id}>修改</a>
                  <span className="ant-divider"/>
                  <a href="#">删除</a>
                </span>
            ),
            width: 100,
            key: 'home-manage-action',
            className: 'home-manage-action'
        }];

        return (
            <div className="home-manage">
                <div className="h-1">
                    主页公告
                </div>
                <Table
                    columns={columns}
                    rowKey={record => `home-manage-${record.id}`}
                    dataSource={notice}
                    pagination={false}
                    size="small"
                    key="home-manage-table"
                    className="home-manage-table"
                    expandedRowRender={record => <p>{record.content}</p>}
                    title={title}
                />

                <Modal
                    visible={this.state.visible}
                    title="添加公告"
                    onOk={this.handleOk}
                    maskClosable={false}
                    onCancel={this.handleCancel}
                    afterClose={() => {
                    }}
                    footer={[
                        <Button key="back" size="large" onClick={this.handleCancel}>Return</Button>,
                        <Button key="submit" type="primary" size="large" loading={this.state.loading}
                                onClick={this.handleOk}>
                            Submit
                        </Button>
                    ]}
                >
                    <Input type="textarea" placeholder="请输入标题" autosize={{maxRows: 6}}/>
                    <div style={{margin: '24px 0'}}/>

                    <Input type="textarea" placeholder="请输入内容" autosize={{minRows: 2, maxRows: 6}}/>
                    <div style={{margin: '10px 0'}}/>
                    <span style={{marginRight: '10px'}}>请选择重要程度，会根据程度展示不同样式</span>
                    <RadioGroup onChange={this.onChange} value={this.state.value}>
                        <Radio value={1}>普通</Radio>
                        <Radio value={2}>重要</Radio>
                        <Radio value={3}>紧急</Radio>
                    </RadioGroup>
                </Modal>
            </div>
        );
    }
}

export default HomeManage;
