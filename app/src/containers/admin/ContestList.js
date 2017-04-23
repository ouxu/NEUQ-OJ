/**
 * Created by out_xu on 17/3/26.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getContestsMine, searchContests } from 'actions'
import ContestList from 'components/admin/Contest/ContestList'

@connect(
  state => ({
    contest: state.contests
  }),
  dispatch => bindActionCreators({getContestsMine, searchContests}, dispatch),
)
class ContestListManageContainer extends Component {
  render () {
    const {contest: {conteststable}, getContestsMine, searchContests} = this.props
    return (
      <ContestList
        data={conteststable}
        getContestsMine={getContestsMine}
        searchContests={searchContests}
      />

    )
  }
}

export default ContestListManageContainer
