/**
 * Created by out_xu on 17/2/28.
 */
import React from 'react'
import { Link } from 'react-router'
import { Badge } from 'antd'

/**
 * 因为后端给的result值是从-1到5的整数，所以在后面对 result 进行了加一的操作
 */
const result = [
  <Badge status='error' text='系统错误' />,
  <Badge status='success' text='' />,
  <Badge status='error' text='' />,
  <Badge status='error' text='编译错误' />,
  <Badge status='warning' text='部分通过' />,
  <Badge status='success' text='正确' />
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
  key: 'status-none',
  className: 'status-none'
}, {
  title: '#',
  render: record =>(
    <span>
      <Link to={`/status/${record.id}`}> {record.id}</Link>
    </span>
  ),
  key: 'status-id',
  className: 'status-id'
}, {
  title: '问题',
  render: record =>
    <span>
      <Link to={`/problems/${record.problem_id}`}> {record.problem_id}</Link>
    </span>,
  key: 'status-problem-id',
  className: 'status-problem-id'
}, {
  title: '用户ID',
  render: record =>
    <span>
      <Link to={`/userpage/${record.user_id}`}> {record.user_id}</Link>
    </span>,
  key: 'status-user-id',
  className: 'status—user-id'
}, {
  title: '用户名',
  render: record =>
    <span>
      <Link to={`/userpage/${record.user_id}`}> {record.name}</Link>
    </span>,
  key: 'status-user-name',
  className: 'status—user-name'
}, {
  title: '运行结果',
  render: record =>
    <span>
      {result[record.result + 1]}
    </span>,
  key: 'status-result',
  className: 'status-result'
}, {
  title: '通过率',
  dataIndex: 'pass_rate',
  render: record =>
    (<span>{record * 100}%</span>)
  ,
  key: 'pass_rate',
  className: 'pass_rate'
}, {
  title: '语言',
  render: record =>(
    <span>
      <Link to={`/status/${record.id}`}>  {language[record.language]}</Link>
    </span>
  ),
  key: 'status-language',
  className: 'status-language'
}, {
  title: '代码长度',
  dataIndex: 'code_length',
  key: 'code_length',
  className: 'status-code-length'
}, {
  title: '提交时间',
  dataIndex: 'created_at',
  width: 160,
  key: 'status-created-at',
  className: 'status-created-at'
}]
