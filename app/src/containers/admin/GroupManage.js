/**
 * Created by out_xu on 16/12/30.
 */
import GroupsManage from 'components/admin/Group/GroupManage'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  changeGroupOwner,
  createGroupNotice,
  delGroupNotice,
  dismissGroup,
  getGroupNoticeDetail,
  getGroupNotices,
  getGroupTable,
  updateGroupNotice,
  getGroupUsers,
  delGroupUsers,
  getGroupInfo,
  updateGroupInfo
} from 'actions'

export default connect(
  state => ({
    groups: state.groups
  }),
  dispatch => bindActionCreators({
    getGroupTable,
    getGroupNotices,
    createGroupNotice,
    delGroupNotice,
    getGroupNoticeDetail,
    updateGroupNotice,
    dismissGroup,
    changeGroupOwner,
    delGroupUsers,
    getGroupUsers,
    getGroupInfo,
    updateGroupInfo
  }, dispatch),
)(GroupsManage)
