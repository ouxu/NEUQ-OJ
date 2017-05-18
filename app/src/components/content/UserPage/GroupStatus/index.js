/**
 * Created by out_xu on 17/5/16.
 */
import React from 'react'
import { Card, Table } from 'antd'
import './index.less'
const GroupStatus = (props) => {
  const columns = [
    {
      title: 'avatar',
      dataIndex: 'avatar',
      width: 48
    }, {
      title: 'content',
      dataIndex: 'content',
      render: (record, index) => <div />
    }
  ]
  return (
    <Card bordered={false} className='group-status'>
      <Table
        columns={columns}
        pagination={false}
        showHeader={false}
        rowKey={(record, key) => key}
      />
    </Card>
  )
}

export default GroupStatus
