import React, { Component } from 'react'
import { Input } from 'antd'

class CustomForm extends React.Component {
  constructor (props) {
    super(props)

    const value = this.props.value || {}
    this.state = {
      user_id: value.user_id || '',
      user_tag: value.user_tag || ''
    }
  }

  componentWillReceiveProps (nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const value = nextProps.value
      this.setState(value)
    }
  }

  handleUserIDChange = (e) => {
    const user_id = e.target.value

    if (!('value' in this.props)) {
      this.setState({user_id})
    }
    this.triggerChange({user_id})
  }
  handleUserTagChange = (e) => {
    const user_tag = e.target.value
    if (!('value' in this.props)) {
      this.setState({user_tag})
    }
    this.triggerChange({user_tag})
  }
  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue))
    }
  }

  render () {
    const {size} = this.props
    const state = this.state
    return (
      <span>
        <Input
          type='text'
          size={size}
          value={state.user_id}
          onChange={this.handleUserIDChange}
          style={{width: 200, marginRight: '3%'}}
          placeholder='请输入用户 ID'
        />
        <Input
          type='text'
          size={size}
          value={state.user_tag}
          onChange={this.handleUserTagChange}
          placeholder='请输入用户备注'
          style={{width: 200, marginRight: '3%'}}
        />
      </span>
    )
  }
}
export default CustomForm