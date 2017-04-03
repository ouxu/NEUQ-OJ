/**
 * Created by out_xu on 17/3/28.
 */
import React, {Component} from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.core.css";
// import "react-quill/dist/quill.snow.css";
import "./index.less";
import moment from "moment";
import {Button, DatePicker, Form, Input, Popconfirm, Radio, Select, Spin} from "antd";

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;

@Form.create()
class ContestEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkPrivate = this.checkPrivate.bind(this);
        this.onConfirmDel = this.onConfirmDel.bind(this)
        this.passwordChange = this.passwordChange.bind(this)
    }

    passwordChange(e) {
        this.setState({
            password: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields(async (err, fieldsValue) => {
            if (!err) {
                const rangeTimeValue = await fieldsValue['range-time-picker'];
                let langmask = fieldsValue.langmask.map((t) => +t);
                const values = {
                    'title': fieldsValue.title,
                    'start_time': rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
                    'end_time': rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
                    'private': +fieldsValue.privated,
                    'password': fieldsValue.password,
                    'langmask': langmask,
                    'problems': fieldsValue.problems,
                    'users': fieldsValue.users,
                    'description': fieldsValue.description,
                    'user_password': this.state.password
                };
                await this.props.editContest(values, this.props.cid)
            }
        });
    }

    onConfirmDel() {
        this.props.delContest(this.props.cid, {password: this.state.password})
    }

    checkPrivate() {
        const form = this.props.form;
        return +form.getFieldValue('privated') !== 1
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {contest: {contest_info = {id: NaN}, problem_info = [], user_ids}, cid} = this.props;
        const problems = [];
        problem_info.forEach((t) => {
            problems.push(t.pid + '')
        });
        const title = <Input type="password" onChange={this.passwordChange} placeholder="请输入您的登录密码" size="small"/>;
        const formItemLayout = {};
        return (
            <Spin tip="Loading..." spinning={!!cid ? (+cid !== contest_info.id) : false}>
                <div className="contest-edit">
                    <div className="h-1">
                        {this.props.cid ? '修改竞赛 #' + this.props.cid : '添加竞赛'}
                    </div>
                    <div className="contest-edit-content">
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem
                                {...formItemLayout}
                                label="标题"
                            >
                                {getFieldDecorator('title', {
                                    rules: [{required: true, message: '请输入标题'}],
                                    initialValue: problems.length > 0 ? contest_info.title : ''
                                })(
                                    <Input placeholder="请输入标题" type="textarea" autosize={{minRows: 1, maxRows: 6}}/>
                                )}

                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="描述"
                            >
                                {getFieldDecorator('description', {
                                    rules: [{required: true, message: '请输入描述'}],
                                    initialValue: problems.length > 0 ? contest_info.description : ''
                                })(
                                    <Input placeholder="请输入描述，支持 arkdown 语法，请在 Markdown 编辑器中编辑后粘贴" type="textarea"
                                           autosize={{minRows: 2}}/>
                                )}

                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="时间"
                            >
                                {getFieldDecorator('range-time-picker', {
                                    rules: [{type: 'array', required: true, message: '请选择时间'}],
                                    initialValue: problems.length > 0 && [
                                        moment(contest_info.start_time, "YYYY-MM-DD HH:mm:ss"),
                                        moment(contest_info.end_time, "YYYY-MM-DD HH:mm:ss")]
                                })(
                                    <RangePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                                )}
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label="权限"
                            >
                                {getFieldDecorator('privated', {
                                    rules: [{required: true, message: '请设置竞赛状态'}],
                                    initialValue: problems.length > 0 && contest_info.private
                                })(
                                    <RadioGroup>
                                        <Radio value="0">公开</Radio>
                                        <Radio value="1">加密</Radio>
                                        <Radio value="2">私有</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="加密密码"
                            >
                                {getFieldDecorator('password', {
                                    rules: [{required: !this.checkPrivate(), message: '请设置竞赛状态'}],
                                    initialValue: problems.length > 0 ? contest_info.password : ''
                                })(
                                    <Input placeholder="请输入标题" disabled={this.checkPrivate()}/>
                                )}

                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="语言"
                            >
                                {getFieldDecorator('langmask', {
                                    rules: [{type: 'array'}],
                                    initialValue: problems.length > 0 ? [] : ['0', '1', '3', '6']
                                })(
                                    <Select multiple placeholder="请选择支持语言">
                                        <Option value="0">C</Option>
                                        <Option value="1">C++</Option>
                                        {/* <Option value="2">Pascal</Option>*/}
                                        <Option value="3">Java</Option>
                                        {/* <Option value="4">Ruby</Option>*/}
                                        {/* <Option value="5">Shell</Option>*/}
                                        <Option value="6">Python</Option>
                                        {/* <Option value="7">php</Option>*/}
                                        {/* <Option value="9">perl</Option>*/}
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="题目"
                            >
                                {getFieldDecorator('problems', {
                                    rules: [{required: true, message: '请选择题目', type: 'array'}],
                                    initialValue: problems.length > 0 ? problems : []
                                })(
                                    <Select
                                        tags
                                        tokenSeparators={[' ']}
                                        notFoundContent='可在 Excel 中复制后直接粘贴'
                                    />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="用户"
                            >
                                {getFieldDecorator('users', {
                                    rules: [{type: 'array'}],
                                    initialValue: problems.length > 0 ? user_ids : []
                                })(
                                    <Select
                                        tags
                                        tokenSeparators={[' ']}
                                        notFoundContent='可在 Excel 中复制后直接粘贴'
                                    />
                                )}
                            </FormItem>
                            <FormItem>
                                {
                                    this.props.cid ?
                                        <Popconfirm title={title} onConfirm={this.handleSubmit} okText="Yes"
                                                    cancelText="No">
                                            <Button className="contest-edit-submit" size="large" type="primary">
                                                修改竞赛
                                            </Button>
                                        </Popconfirm>
                                        : <Popconfirm title='请认真审核信息' onConfirm={this.handleSubmit} okText="Yes"
                                                      cancelText="No">
                                        <Button type="danger" size="large">添加竞赛</Button>
                                    </Popconfirm>
                                }


                                {this.props.cid &&
                                <Popconfirm title={title} onConfirm={this.onConfirmDel} okText="Yes"
                                            cancelText="No">
                                    <Button type="danger" size="large">删除竞赛</Button>
                                </Popconfirm> }

                            </FormItem>
                        </Form>
                    </div>
                </div>
            </Spin>
        );
    }
}


export default ContestEdit;
