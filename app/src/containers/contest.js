/**
 * Created by out_xu on 17/2/21.
 */
import React from 'react'
import ContestPage from '../components/content/contests'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getContest, getContestsTable, joinContest, searchContests, tokenVerify } from '../actions'

@connect(
  state => state.contests,
  dispatch => bindActionCreators({getContestsTable, searchContests, joinContest, getContest, tokenVerify}, dispatch),
)
class ContestsContainer extends React.Component {
  render () {
    const {conteststable, getContestsTable, searchContests, joinContest, getContest, tokenVerify} = this.props
    return (
      <ContestPage
        data={conteststable.contests}
        getContestsTable={getContestsTable}
        searchContests={searchContests}
        joinContest={joinContest}
        getContest={getContest}
        tokenVerify={tokenVerify}
      />
    )
  }
}

export default ContestsContainer
