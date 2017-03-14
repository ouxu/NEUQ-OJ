/**
 * Created by out_xu on 17/2/28.
 */
import React from 'react'
import {Link} from 'react-router'
import {Badge} from 'antd';

const result=[
    <Badge status="processing" text="等待中" />,
    <Badge status="processing" text="等待中" />,
    <Badge status="processing" text="编译中" />,
    <Badge status="processing" text="运行中" />,
    <Badge status="success" text="正确" />,
    <Badge status="error" text="格式错误" />,
    <Badge status="error" text="答案错误" />,
    <Badge status="warning" text="时间超限" />,
    <Badge status="error" text="内存错误" />,
    <Badge status="error" text="输出错误" />,
    <Badge status="error" text="运行错误" />,
    <Badge status="error" text="编译错误" />
]
const language=[
    'C',
    'C++',
    'Pascal',
    'Java',
    'ruby',
    'Shell',
    'Python',
    'php',
    'perl'
]

export const columns=[{
        title: '',
        width: '1%',
        key: 'status-none',
        className: 'status-none'
    },{
        title: '#',
        dataIndex: 'id',
        width: '10%',
        key: 'status-id',
        className: 'status-id'
    },{
        title: '问题',
        render: ((record)=>
                <span>
                    <Link to={`problems/${record.problem_id}`} > {record.problem_id}</Link>
                </span>
        ),
        width: '10%',
        key: 'status-problem-id',
        className: 'status-problem-id'
    },{
        title: '用户ID',
        render: ((record)=>
                <span>
                    <Link to={`userpage/${record.user_id}`} > {record.user_id}</Link>
                </span>
        ),
        width: '10%',
        key: 'status-user-id',
        className: 'status—user-id'
    },{
        title: '用户名',
        render: ((record)=>
                <span>
                    <Link to={`userpage/${record.user_id}`} > {record.name}</Link>
                </span>
        ),
        width: '10%',
        key: 'status-user-name',
        className: 'status—user-name'
    },{
        title: '运行结果',
        render: ((record)=>
                <span>
                    {result[record.result]}
                </span>
        ),
        width: '10%',
        key: 'status-result',
        className: 'status-result'
    },{
        title: '内存',
        dataIndex: 'memory',
        width: '8%',
        key: 'status-memory',
        className: 'status-memory'
    },{
        title: '耗时',
        dataIndex: 'time',
        width: '8%',
        key: 'status-time',
        className: 'status-time'
    },{
        title: '语言',
        render: ((record)=>
                <span>
                    {language[record.language]}
                </span>
        ),
        width: '8%',
        key: 'status-language',
        className: 'status-language'
    },{
        title: '代码长度',
        dataIndex: 'code_length',
        width: '8%',
        key: 'code_length',
        className: 'status-code-length'
    },{
        title: '提交时间',
        dataIndex: 'created_at',
        width: '18%',
        key: 'status-created-at',
        className: 'status-created-at'
    }]