/**
 * Created by out_xu on 16/12/29.
 */
import React from 'react'
import UserPanel from '../components/content/userpage'
// 连接redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUserInfo, getUserMe } from '../actions'

@connect(
  state => state.user,
  dispatch => bindActionCreators({getUserInfo, getUserMe}, dispatch),
)
class UserpageContainer extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    const id = localStorage.getItem('neuq_oj.id')
    this.props.params.id === id ? this.props.getUserMe() : this.props.getUserInfo(this.props.params.id)
  }

  render () {
    const {userinfo, userme} = this.props
    const me = this.props.params.id === localStorage.getItem('neuq_oj.id')
    return (
      <UserPanel user={me ? userme : userinfo}/>
    )
  }
}

export default UserpageContainer
