/**
 * Created by out_xu on 17/2/28.
 */
import React from 'react'
import { Link } from 'react-router'
import { Badge } from 'antd'

const result = [
  <Badge status='processing' text='等待中' />,
  <Badge status='processing' text='等待中' />,
  <Badge status='processing' text='编译中' />,
  <Badge status='processing' text='运行中' />,
  <Badge status='success' text='正确' />,
  <Badge status='error' text='格式错误' />,
  <Badge status='error' text='答案错误' />,
  <Badge status='warning' text='时间超限' />,
  <Badge status='error' text='内存错误' />,
  <Badge status='error' text='输出错误' />,
  <Badge status='error' text='运行错误' />,
  <Badge status='error' text='编译错误' />
]
const language = [
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

export const columns = [{
  title: '',
  width: '1%',
  key: 'Status-none',
  className: 'Status-none'
}, {
  title: '#',
  dataIndex: 'id',
  key: 'Status-id',
  className: 'Status-id'
}, {
  title: '问题',
  render: record =>
    <span>
      <Link to={`problems/${record.problem_id}`} > {record.problem_id}</Link>
    </span>,
  key: 'Status-problem-id',
  className: 'Status-problem-id'
}, {
  title: '用户ID',
  render: record =>
    <span>
      <Link to={`userpage/${record.user_id}`} > {record.user_id}</Link>
    </span>,
  key: 'Status-user-id',
  className: 'Status—user-id'
}, {
  title: '用户名',
  render: record =>
    <span>
      <Link to={`userpage/${record.user_id}`} > {record.name}</Link>
    </span>,
  key: 'Status-user-name',
  className: 'Status—user-name'
}, {
  title: '运行结果',
  render: record =>
    <span>
      {result[record.result]}
    </span>,
  key: 'Status-result',
  className: 'Status-result'
}, {
  title: '内存',
  dataIndex: 'memory',
  key: 'Status-memory',
  className: 'Status-memory'
}, {
  title: '耗时',
  dataIndex: 'time',
  key: 'Status-time',
  className: 'Status-time'
}, {
  title: '语言',
  render: record =>
    <span>
      {language[record.language]}
    </span>,
  key: 'Status-language',
  className: 'Status-language'
}, {
  title: '代码长度',
  dataIndex: 'code_length',
  key: 'code_length',
  className: 'Status-code-length'
}, {
  title: '提交时间',
  dataIndex: 'created_at',
  width: 160,
  key: 'Status-created-at',
  className: 'Status-created-at'
}]
