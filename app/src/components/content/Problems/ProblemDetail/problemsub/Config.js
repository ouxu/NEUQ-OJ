import React from 'react'
import { Badge } from 'antd'

const result = [
  <Badge status='error' text='答案错误' />,
  <Badge status='success' text='通过' />,
  <Badge status='warning' text='CPU时间超限' />,
  <Badge status='warning' text='运行时间超限' />,
  <Badge status='warning' text='内存超限' />,
  <Badge status='error' text='运行时错误' />,
  <Badge status='error' text='系统错误' />
]
const result2 = [
  <Badge status='error' text='判题系统异常' />,
  <Badge status='error' text='' />,
  <Badge status='error' text='' />,
  <Badge status='error' text='编译错误' />
]
const columnsP = [{
  title: '结果',
  width: '20%',
  render: record =>
    <span>
      {result[record.Result + 1]}
    </span>,
  className: 'status-result-code'
}, {
  title: '耗时',
  width: '40%',
  dataIndex: 'CpuTime',
  className: 'status—cpu-time'
}, {
  title: '内存',
  width: '40%',
  dataIndex: 'Memory',
  className: 'status-memory'
}]

const columnsUP = [{
  title: '结果',
  render: record =>
    <span>
      {result2[record.result_code + 1]}
    </span>,
  width: '20%',
  className: 'problem-detail-main-result-1'
}, {
  title: '错误信息',
  dataIndex: 'result_data',
  fixed: 'center',
  className: 'status-result-data'
}]

export { columnsP, columnsUP }
