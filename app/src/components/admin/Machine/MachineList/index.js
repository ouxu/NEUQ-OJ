import React, {Component} from 'react'
import {Table, Icon} from 'antd'

class MachineList extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const columns = [
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id'
      }, {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: 'Host',
        dataIndex: 'host',
        key: 'host'
      }, {
        title: 'Port',
        dataIndex: 'port',
        key: 'port'
      }, {
        title: 'Status',
        dataIndex: 'status',
        key: 'status'
      }, {
        title: 'CPU%',
        dataIndex: 'cpu',
        key: 'cpu'
      }, {
        title: 'MEM%',
        dataIndex: 'memory',
        key: 'memory'
      }, {
        title: 'Hostname',
        dataIndex: 'hostname',
        key: 'hostname'
      }, {
        title: 'Ping',
        dataIndex: 'ping',
        key: 'ping'
      }]
    const data = [{
      id: 1,
      name: 'dm1',
      host: '120.92.114.231',
      port: '8090',
      status: 1,
      created_at: null,
      updated_at: null,
      action: 'pong',
      cpu: 0.10333710721963,
      cpu_core: 2,
      hostname: '31f624f82091',
      judger_version: '0.1.0',
      memory: 19.785744351631,
      ping: '10ms'
    }]
    const props = this.props
    return (
      <div className="machine-list">
        <div className='h-1'>
          机器列表
        </div>
        <Table
          columns={columns}
          bordered={true}
          dataSource={data}
          rowKey={record => record.id}
        /></div>
    )
  }
}

export default MachineList