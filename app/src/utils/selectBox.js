/**
 * Created by out_xu on 17/1/7.
 */
import React from 'react';
import {Select} from 'antd'


const Option = Select.Option;

export class LanguageSelect extends React.Component{
    render(){
        return (
            <Select
                style={{ width: 100 }}
                placeholder="语言"
                optionFilterProp="children"
                onChange={this.props.handleChange}
                className="status-table-header-other-select"
                allowClear={!this.props.allowClear}
                defaultValue={this.props.defaultvalue}
            >
                <Option value="0">C</Option>
                <Option value="1">C++</Option>
                {/*<Option value="2">Pascal</Option>*/}
                <Option value="3">Java</Option>
                {/*<Option value="4">Ruby</Option>*/}
                {/*<Option value="5">Shell</Option>*/}
                <Option value="6">Python</Option>
                {/*<Option value="7">php</Option>*/}
                {/*<Option value="9">perl</Option>*/}
            </Select>
        )
    }
}

export class ResultSelect extends React.Component{
    render(){
        return (
            <Select
                style={{ width: 90}}
                placeholder="结果"
                optionFilterProp="children"
                onChange={this.props.handleChange}
                className="status-table-header-other-select"
                allowClear
            >
                <Option value="0">等待中</Option>
                <Option value="2">编译中</Option>
                <Option value="3">运行中</Option>
                <Option value="4">正确</Option>
                <Option value="5">格式错误</Option>
                <Option value="6">答案错误</Option>
                <Option value="7">时间超限</Option>
                <Option value="8">内存超限</Option>
                <Option value="9">输出超限</Option>
                <Option value="10">运行错误</Option>
                <Option value="11">编译错误</Option>
            </Select>
        )
    }
}

export class TimeSelect extends React.Component{
    render(){
        return (
            <Select
                style={{ width: 80 }}
                placeholder="总榜"
                optionFilterProp="children"
                onChange={this.props.handleChange}
                allowClear={!this.props.allowClear}
                defaultValue={this.props.defaultvalue}
            >
                <Option value="total">总榜</Option>
                <Option value="d">天</Option>
                <Option value="w">周</Option>
                <Option value="m">月</Option>
            </Select>
        )
    }
}
