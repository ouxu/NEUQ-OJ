/**
 * Created by out_xu on 17/2/28.
 */
import React from 'react'
import Navigation from 'components/plugins/Navigation'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getMessageCount, getUserMe, logout, tokenVerify } from 'actions'

@connect(
  state => ({
    user: state.user
  }),
  dispatch => bindActionCreators({logout, tokenVerify, getMessageCount, getUserMe}, dispatch)
)
class NavigationContainer extends React.Component {
  async componentDidMount () {
    try {
      await this.props.tokenVerify()
      await this.props.getUserMe()
      // this.props.action.getMessageCount()
    } catch (e) {
      e.message !== '未登录' && console.error(e)
    }
  }

  render () {
    return (
      <Navigation
        user={this.props.user}
        logout={this.props.logout}
      />
    )
  }
}

export default NavigationContainer
