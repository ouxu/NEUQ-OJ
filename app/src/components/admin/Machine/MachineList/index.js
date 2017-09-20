import React, {Component} from 'react'
import {Link} from 'react-router'
import {Table, Modal, Icon, Spin, Button, message, Tag} from 'antd'
import {color} from 'utils'
import QueueAnim from 'rc-queue-anim'

const confirm = Modal.confirm
const COUNTER = 10

class MachineList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      counter: 1,
      flag: false
    }
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.Counter = this.Counter.bind(this)
    this.toggleMachineState = this.toggleMachineState.bind(this)
    this.stopRefresh = this.stopRefresh.bind(this)
    this.startRefresh = this.startRefresh.bind(this)
    this.delMachine = this.delMachine.bind(this)
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
    this.setState({
      counter: this.state.counter + 1
    })
    if (this.state.counter >= COUNTER) {
      this.stopRefresh()
      message.success('自动刷新停止')
    }
    console.log(this.state)
  }

  handleButtonClick() {
    if (this.state.counter > COUNTER) {
      this.startRefresh(3)
      message.success('自动刷新开始')
    } else {
      this.stopRefresh()
      message.success('自动刷新停止')
    }
    this.props.getJudgeList()
    // console.log(this.state)
  }

  getJudgeList() {
    this.props.getJudgeList()
  }

  /**
   * 停止自动刷新函数
   */
  stopRefresh() {
    this.counter && clearInterval(this.counter)
    this.timer && clearInterval(this.timer)
    this.state.counter = 100
  }

  /*
   *开始自动刷新函数
   * @param time 间隔时间，单位为秒
   */
  startRefresh(time) {
    this.props.getJudgeList()
    this.setState({
      counter: 1
    })
    this.counter && clearInterval(this.counter)
    this.timer && clearInterval(this.timer)
    this.counter = setInterval(this.Counter.bind(this), time * 1000)
    this.timer = setInterval(this.props.getJudgeList, time * 1000)
  }

  /*
  切换机器状态的函数
   */
  toggleMachineState(e) {
    // 修改机器的状态之前，首先先停止自动刷新
    this.stopRefresh()
    // 默认传入的函数中的参数event包含了该行全部的信息，所以可以容易的获取ID值和状态值
    const {id, status} = e
    if (id && (status === 0 || status === 1)) {
      message.success('机器正常，可以开启或者关闭')
    } else {
      message.error('机器状态异常，请查明原因')
    }
    //完成之后，调用一次信息
    this.props.getJudgeList()
  }

  // 删除对应的机器
  delMachine = (record) => {
    this.stopRefresh()
    confirm({
      title: '确定删除',
      content: '请确定是否删除该判题服务器',
      onOk: async () => {
        await this.props.delJudgeServer(record.id)
        this.setState({
          flag: !this.state.flag
        })
        this.startRefresh(3)
      }
    })
    //完成之后，调用一次信息

  }

  render() {
    const machineStatus = [
      '关闭',
      '正常',
      '异常'
    ]
    const colorArr = {
      0: color.gray,
      1: color.green,
      2: color.red
    }
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
        // dataIndex: 'status',
        render: record => <Tag color={colorArr[record.status]}>{machineStatus[record.status]}</Tag>,
        onCellClick: this.toggleMachineState,
        key: 'status'
      }, {
        title: '处理器占比',
        dataIndex: 'cpu',
        key: 'cpu',
        width: 150
      }, {
        title: '内存占比',
        dataIndex: 'memory',
        key: 'memory',
        width: 150
      }, {
        title: '主机名称',
        dataIndex: 'hostname',
        key: 'hostname'
      }, {
        title: '操作',
        render: (record) => <Link to={'/admin/machine-edit/' + record.id}>修改</Link>,
        width: 100,
        key: 'problem-manage-action',
        className: 'problem-manage-action'
      }, {
        title: '删除',
        render: () => <a>删除</a>,
        width: 100,
        key: 'problem-manage-del',
        onCellClick: this.delMachine,
        className: 'problem-manage-action'
      }]
    const {machines: {machineTable = []}} = this.props
    return (
      <div>
        <QueueAnim className='machine-list' delay={100} type='bottom'>
          <div className='h-1'>
            机器列表
          </div>
          <Table
            style={{textAlign: 'center'}}
            columns={columns}
            pagination={false}
            bordered={true}
            dataSource={machineTable}
            rowKey={record => record.id}
          />
          <Button
            type={this.state.counter < COUNTER ? 'primary' : 'danger'}
            className='refresh'
            onClick={this.handleButtonClick}
          >{this.state.counter < COUNTER ? '停止自动刷新' : '开启自动刷新'}</Button>
        </QueueAnim>
      </div>
    )
  }
}

export default MachineList