import React, {Component} from 'react'
import {Table, Icon, Spin, Button} from 'antd'
import loading from '../../../../reducers/loading.reducer'
import machines from '../../../../reducers/machine.reducer'

class MachineList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      macInfo: []
    }
    this.MachineRefresh = this.MachineRefresh.bind(this)
  }

  componentWillMount() {
    this.props.getJudgeList()
  }
  componentDidMount(){
    console.log(this.state.macInfo)
  }
  MachineRefresh() {
    this.props.getJudgeList()
    console.log(this.state.macInfo)
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
    const {machines: {machineTable = [], machineInfo = []}} = this.props
    // console.log(machineInfo)
    this.state.macInfo = machineInfo
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