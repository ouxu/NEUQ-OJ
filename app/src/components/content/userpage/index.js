/**
 * Created by out_xu on 16/12/30.
 */
import React from 'react'

import QueueAnim from 'rc-queue-anim'
import { Icon, Tooltip } from 'antd'
import './index.less'

import DashCard from './dashcard'
import StatusCard from './statuscard'
class UserPanel extends React.Component {
  render () {
    const {user, status} = this.props
    return (
      <QueueAnim className='userpage-wrap' delay={100}>
        <div className='userpage-header' key='userpage-1'>
          <span className='userpage-header-title'>
            <Icon type='user' />
            <span> {user.name} / 个人资料</span>

          </span>
          <div className='userpage-header-other'>
            <Tooltip placement='bottomRight' title={user.email ? user.email : ''}>
              <Icon type='mail' />
            </Tooltip>
            <Tooltip placement='bottomRight' title={user.mobile ? user.mobile : ''}>
              <Icon type='mobile' />
            </Tooltip>
            <Tooltip placement='bottomRight' title={user.school ? user.school : ''}>
              <Icon type='flag' />

            </Tooltip>
            <Tooltip placement='bottomRight' title='编辑个人信息'>
              <Icon type='edit' />
            </Tooltip>
          </div>
        </div>
        <DashCard status={status} />
        <StatusCard userdata={user} />
      </QueueAnim>

    )
  }
}

export default UserPanel
