import React, {Component} from 'react'
import {Table, Icon, Spin, Button, message} from 'antd'
import {getJudgeList} from '../../../../actions/machine.action'
const COUNTER = 10
class MachineList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      counter: 1
    }
    this.MachineRefresh = this.MachineRefresh.bind(this)
    this.Counter = this.Counter.bind(this)
  }

  componentWillMount() {
    this.props.getJudgeList()
    this.timer = setInterval(this.props.getJudgeList, 3000)
    this.counter = setInterval(this.Counter.bind(this), 3000)
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer)
    this.counter && clearInterval(this.counter)
  }

  Counter() {
    this.setState = {
      counter: this.state.counter++
    }
    if (this.state.counter > COUNTER) {
      this.timer && clearInterval(this.timer)
      this.counter && clearInterval(this.counter)
      message.success('自动刷新停止')
    }
    console.log(this.state)
  }

  MachineRefresh() {
    if (this.state.counter > COUNTER) {
      this.state.counter = 1
      this.counter && clearInterval(this.counter)
      this.timer && clearInterval(this.timer)
      this.counter = setInterval(this.Counter.bind(this), 3000)
      this.timer = setInterval(this.props.getJudgeList, 3000)
      message.success('自动刷新开始')
    }else {
      this.counter && clearInterval(this.counter)
      this.timer && clearInterval(this.timer)
      this.state.counter = 100
      message.success('自动刷新停止')
    }
    this.props.getJudgeList()
    console.log(this.state)
  }

  render() {
    const columns = [
      {
        title: '编号',
        dataIndex: 'id',
        key: 'id'
      }, {
        title: '名称',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: '地址',
        dataIndex: 'host',
        key: 'host'
      }, {
        title: '端口',
        dataIndex: 'port',
        key: 'port'
      }, {
        title: '运行状态',
        dataIndex: 'status',
        key: 'status'
      }, {
        title: '处理器占比',
        dataIndex: 'cpu',
        key: 'cpu',
        width: 200
      }, {
        title: '内存占比',
        dataIndex: 'memory',
        key: 'memory',
        width: 200
      }, {
        title: '主机名称',
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
          type={this.state.counter < COUNTER ? 'primary' : 'danger'}
          className='refresh'
          onClick={this.MachineRefresh}
        >{this.state.counter < COUNTER ? '停止自动刷新' : '开启自动刷新'}</Button>
      </div>
    )
  }
}

export default MachineList