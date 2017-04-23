/**
 * Created by out_xu on 16/12/29.
 */
import React from 'react'
import UserPanel from 'components/content/UserPage'
// 连接redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { checkMessage, getStatusTable, getUserInfo, getUserMe } from 'actions'

@connect(
  state => ({
    user: state.user,
    status: state.status
  }),
  dispatch => bindActionCreators({getUserInfo, getUserMe, checkMessage, getStatusTable}, dispatch),
)
class UserpageContainer extends React.Component {
  componentDidMount () {
    const id = window.localStorage.getItem('neuq_oj.id')
    this.props.params.id === id ? this.props.getUserMe() : this.props.getUserInfo(this.props.params.id)
    this.props.checkMessage(37)
    this.props.getStatusTable(1, 10, {user_id: this.props.params.id})
  }

  render () {
    const {user: {userInfo, userMe}, status} = this.props
    const me = this.props.params.id === window.localStorage.getItem('neuq_oj.id')
    return (
      <UserPanel
        user={me ? userMe : userInfo}
        status={status}
      />
    )
  }
}

export default UserpageContainer
