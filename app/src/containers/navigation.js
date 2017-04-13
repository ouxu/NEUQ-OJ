/**
 * Created by out_xu on 17/2/28.
 */
import React from 'react'
import Navigation from '../components/plugins/navigation'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout, tokenVerify } from '../actions'

const mapDispatchToProps = (dispatch) => {
  const actions = {logout, tokenVerify}
  return {
    action: bindActionCreators(actions, dispatch)
  }
}

@connect(
  state => ({
    user: state.user
  }),
  mapDispatchToProps,
)
class NavigationContainer extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
      try {
        this.props.action.tokenVerify()
      } catch (e) {
        console.error(e)
      }
    }

  render () {
    return (
      <Navigation
        user={this.props.user}
        logout={this.props.action.logout}
        tokenVerify={this.props.action.tokenVerify}
      />
    )
  }
}

export default NavigationContainer
