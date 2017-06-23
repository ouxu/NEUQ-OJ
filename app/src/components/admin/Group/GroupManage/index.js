/**
 * Created by out_xu on 17/4/8.
 */
import React, { Component } from 'react'
import { Collapse, Form, Tabs } from 'antd'
import { openInNewTab, replaceQueryString } from 'utils'
import QueueAnim from 'rc-queue-anim'
import './index.less'
import InfoUpdate from './InfoUpdate'
import NoticeManage from './NoticeManage'
import OtherManage from './OtherManage'
import UserManage from './UserManage'
import Homework from './Homework'
const TabPane = Tabs.TabPane

const Panel = Collapse.Panel
@Form.create()
class GroupManage extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
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

  onTabChange = (key) => {
    let params = {
      type: key
    }
    replaceQueryString(this.props.router, params, true)
  }

  render () {
    const {params: {gid}, router} = this.props
    const {location: {query}} = router
    const {type = 'homework'} = query
    const {delGroupUsers, updateUserTag, getGroupUsers} = this.props
    const {createGroupNotice, getGroupNotices, delGroupNotice, getGroupNoticeDetail, updateGroupNotice} = this.props
    const {changeGroupOwner, dismissGroup, updateGroupInfo, getGroupInfo} = this.props
    const {groupNotices = [], groupNoticeDetail, groupUsers = [], groupsTable = {}, groupInfo = {}} = this.props.groups

    return (
      <QueueAnim className='group-manage' delay={100}>
        <div className='h-1 group-manage-header' key='group-manage-header'>
          <span>管理用户组</span>
          <span style={{fontSize: 14}}>
            <a onClick={() => openInNewTab('userpage/' + groupInfo.owner_id)}>所有者ID {groupInfo.owner_id}</a>
          </span>
        </div>
        <div className='group-manage-content' key='group-manage-form'>
          <Tabs defaultActiveKey={type} onChange={this.onTabChange}>
            <TabPane tab='作业&考试' key='homework'>
              <Homework />
            </TabPane>
            <TabPane tab='用户' key='user'>
              <UserManage
                delGroupUsers={delGroupUsers}
                groupUsers={groupUsers}
                gid={gid}
                getGroupUsers={getGroupUsers}
                updateUserTag={updateUserTag}
              />
            </TabPane>
            <TabPane tab='通知' key='notice'>
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
            </TabPane>
            <TabPane tab='设置' key='other'>
              <InfoUpdate
                updateGroupInfo={updateGroupInfo}
                getGroupInfo={getGroupInfo}
                gid={gid}
                groupInfo={groupInfo}
              />
              <OtherManage
                changeGroupOwner={changeGroupOwner}
                dismissGroup={dismissGroup}
                gid={gid}
              />
            </TabPane>
          </Tabs>
        </div>
      </QueueAnim>
    )
  }
}

export default GroupManage
