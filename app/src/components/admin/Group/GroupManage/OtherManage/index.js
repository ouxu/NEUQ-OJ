/**
 * Created by out_xu on 17/6/5.
 */
import React, { Component } from 'react'
import { Button, Input, Select } from 'antd'
const Option = Select.Option

class OtherManage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      selected: 'changeGroupOwner',
      newOwnerId: '',
      password: ''
    }
    this.showModal = this.showModal.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.targetInputOnChange = this.targetInputOnChange.bind(this)
    this.passwordInputOnChange = this.passwordInputOnChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  showModal () {
    this.setState({
      visible: true
    })
  }

  handleOk (e) {
    e.preventDefault()
    this.setState({loading: true})
    const {gid} = this.props
    let body = {
      password: this.state.password
    }
    if (this.state.selected === 'changeGroupOwner') {
      body = {
        ...body,
        newOwnerId: this.state.newOwnerId
      }
      this.props.changeGroupOwner(gid, body)
    } else if (this.state.selected === 'dismissGroup') {
      const body = {
        password: this.state.password
      }
      this.props.dismissGroup(gid, body)
    }
    setTimeout(() => {
      this.setState({loading: false})
    }, 1000)
  }

  handleCancel () {
    this.setState({visible: false})
  }

  targetInputOnChange (e) {
    this.setState({
      newOwnerId: e.target.value
    })
  }

  passwordInputOnChange (e) {
    this.setState({
      password: e.target.value
    })
  }

  handleChange (value) {
    console.log(`selected ${value}`)
    this.setState({
      selected: value
    })
  }

  render () {
    return (
      <div className='group-other-manage'>
        <Select defaultValue={['changeGroupOwner']} style={{width: 130}} onChange={this.handleChange}>
          <Option value='changeGroupOwner'>更改用户组所有者</Option>
          <Option value='dismissGroup'>解散用户组</Option>
        </Select>
        {
          this.state.selected === 'changeGroupOwner' &&
          <Input onChange={this.targetInputOnChange} placeholder='需变更到的用户的 ID' style={{width: 150}} />
        }
        <Input onChange={this.passwordInputOnChange} placeholder='请输入您的密码' style={{width: 200}} />
        <Button type='primary' loading={this.state.loading} onClick={this.handleOk}>发起申请</Button>
      </div>

    )
  }
}
export default OtherManage
