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
      width: 48,
    }, {
      title: 'content',
      dataIndex: 'content',
      render: (record, index) => <div>
        <h5>{record.name}</h5>
        <p className={styles.content}>{it.content}</p>
        <div className={styles.daterow}>
          <Tag color={status[it.status].color}>{status[it.status].text}</Tag>
          <span className={styles.date}>{it.date}</span>
        </div>
      </div>,
    },
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
