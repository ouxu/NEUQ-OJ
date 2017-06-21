/**
 * Created by out_xu on 17/4/8.
 */
import React, { Component } from 'react'
import { Collapse, Form } from 'antd'
import QueueAnim from 'rc-queue-anim'
import './index.less'
import InfoUpdate from './InfoUpdate'
import NoticeManage from './NoticeManage'
import OtherManage from './OtherManage'
import UserManage from './UserManage'
import { Link } from 'react-router'
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
    this.props.getGroupUsers(this.props.params.gid)
    this.props.getGroupInfo(this.props.params.gid)

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
    const {delGroupUsers, updateUserInfo} = this.props
    const {createGroupNotice, getGroupNotices, delGroupNotice, getGroupNoticeDetail, updateGroupNotice} = this.props
    const {changeGroupOwner, dismissGroup, updateGroupInfo, getGroupInfo} = this.props
    const {groupNotices = [], groupNoticeDetail, groupUsers = [], groupsTable = {}, groupInfo = {}} = this.props.groups
    return (
      <QueueAnim className='group-manage' delay={100}>
        <div className='h-1 group-manage-header' key='group-manage-header'>
          <span>管理用户组</span>
          <span style={{fontSize: 14}}>
            <Link to={'/userpage/' + groupInfo.owner_id}>所有者ID {groupInfo.owner_id}</Link>
          </span>
        </div>
        <div className='group-manage-content' key='group-manage-form'>
          <Collapse bordered={false} defaultActiveKey={['notice', 'user', 'homework']}>
            <Panel header='成员变更' key='user' style={customPanelStyle}>
              <UserManage
                delGroupUsers={delGroupUsers}
              />
            </Panel>
            <Panel header='基本信息变更' key='info' style={customPanelStyle}>
              <InfoUpdate
                updateGroupInfo={updateGroupInfo}
                getGroupInfo={getGroupInfo}
                gid={gid}
                groupInfo={groupInfo}
              />
            </Panel>
            <Panel header='公告管理' key='notice' style={customPanelStyle}>
              <NoticeManage
                groupNotices={groupNotices}
                groupNoticeDetail={groupNoticeDetail}
                gid={gid}
                createGroupNotice={createGroupNotice}
                getGroupNotices={getGroupNotices}
                delGroupNotice={delGroupNotice}
                getGroupNoticeDetail={getGroupNoticeDetail}
                updateGroupNotice={updateGroupNotice}
              />
            </Panel>
            <Panel header='作业管理' key='homework' style={customPanelStyle}>
              <UserManage />
            </Panel>
            <Panel header='其他操作' key='other' style={customPanelStyle}>
              <OtherManage
                changeGroupOwner={changeGroupOwner}
                dismissGroup={dismissGroup}
                gid={gid}
              />
            </Panel>

          </Collapse>
        </div>
      </QueueAnim>
    )

  }
}

export default GroupManage
