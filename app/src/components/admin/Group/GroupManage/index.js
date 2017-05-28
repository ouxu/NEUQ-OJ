/**
 * Created by out_xu on 17/4/8.
 */
import React, { Component } from 'react'
import { Collapse, Form } from 'antd'
import QueueAnim from 'rc-queue-anim'
import './index.less'
import InfoUpdate from './InfoUpdate'
import NoticeManage from './NoticeManage'
const Panel = Collapse.Panel

@Form.create()
class GroupManage extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    this.props.getGroupNotices(this.props.params.gid)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, value) => {
      if (!err) {
        this.props.createUserGroup(value)
      }
    })
  }

  render () {
    const customPanelStyle = {
      background: '#f5f5f5',
      borderRadius: 4,
      marginBottom: 24,
      border: 0
    }
    const {params: {gid}} = this.props
    const {createGroupNotice,getGroupNotices} =this.props
    const {groupNotices = [], groupNoticeDetial = {}, groupUsers = [], groupsTable = {}} = this.props.groups
    return (
      <QueueAnim className='group-manage' delay={100}>
        <div className='h-1' key='group-manage-header'>
          管理用户组
        </div>
        <div className='group-manage-content' key='group-manage-form'>
          <Collapse bordered={false} defaultActiveKey={['notice', 'user', 'homework']}>
            <Panel header='成员变更' key='user' style={customPanelStyle}>
              <p>1231</p>
            </Panel>
            <Panel header='基本信息变更' key='info' style={customPanelStyle}>
              <InfoUpdate />
            </Panel>
            <Panel header='公告管理' key='notice' style={customPanelStyle}>
              <NoticeManage
                groupNotices={groupNotices}
                gid={gid}
                createGroupNotice={createGroupNotice}
                getGroupNotices={getGroupNotices}
              />
            </Panel>
            <Panel header='作业管理' key='homework' style={customPanelStyle}>
              <p>1231</p>
            </Panel>
            <Panel header='其他操作' key='other' style={customPanelStyle}>
              <p>1231</p>
            </Panel>

          </Collapse>
        </div>
      </QueueAnim>
    )

  }
}

export default GroupManage
