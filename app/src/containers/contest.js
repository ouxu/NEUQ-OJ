/**
 * Created by out_xu on 17/2/21.
 */
import React from 'react'
import ContestPage from '../components/content/contests'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getContest, getContestsTable, joinContest, searchContests, tokenVerify } from '../actions'

@connect(
  state => ({
    contests:state.contests,
    loading: state.loading
  }),
  dispatch => bindActionCreators({getContestsTable, searchContests, joinContest, getContest, tokenVerify}, dispatch),
)
class ContestsContainer extends React.Component {
  render () {
    const {contests:{conteststable},loading, getContestsTable, searchContests, joinContest, getContest, tokenVerify} = this.props
    return (
      <ContestPage
        data={conteststable.contests}
        loading={loading}
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
