/**
 * Created by out_xu on 17/3/26.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getContestsTable, searchContests } from '../../actions'
import ContestList from '../../components/admin/contest/contestlist'

@connect(
  state => ({
    contest: state.contests
  }),
  dispatch => bindActionCreators({getContestsTable, searchContests}, dispatch),
)
class ContestListManageContainer extends Component {

  render () {
    const {contest: {conteststable}, getContestsTable, searchContests,deleteProblem} = this.props
    return (
      <ContestList
        data={conteststable}
        getContestsTable={getContestsTable}
        searchContests={searchContests}
      />

    )
  }
}

export default ContestListManageContainer
