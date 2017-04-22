/**
 * Created by out_xu on 17/1/5.
 */
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getStatusTable, searchStatus } from '../actions'
import StatusTable from '../components/content/status'

@connect(
  state => state.status,
  dispatch => bindActionCreators({getStatusTable, searchStatus}, dispatch),
)
class StatusContainer extends React.Component {
  render () {
    const {statustable} = this.props
    return (
      <StatusTable
        data={statustable}
        getStatusTable={this.props.getStatusTable}
        searchStatus={this.props.searchStatus}
      />
    )
  }
}

export default StatusContainer
