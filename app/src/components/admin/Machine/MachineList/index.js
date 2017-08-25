import React, {Component} from 'react'
import {Table, Icon, Spin, Button} from 'antd'

class MachineList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      macInfo: []
    }
    this.MachineRefresh = this.MachineRefresh.bind(this)
  }

  componentDidMount() {
    this.props.getJudgeList()
  }

  MachineRefresh() {
    this.props.getJudgeList()
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
        key: 'cpu',
        width: 200
      }, {
        title: 'MEM%',
        dataIndex: 'memory',
        key: 'memory',
        width: 200
      }, {
        title: 'Hostname',
        dataIndex: 'hostname',
        key: 'hostname'
      }]
    const {machines: {machineTable = []}} = this.props
    return (
      <div>
        <div className='h-1'>
          机器列表
        </div>
        <Table
          columns={columns}
          bordered={true}
          dataSource={machineTable}
          rowKey={record => record.id}
        />
        <Button
          type="primary"
          className='refresh'
          onClick={this.MachineRefresh}
        >刷新</Button>
      </div>
    )
  }
}

export default MachineList