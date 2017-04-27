/**
 * Created by out_xu on 17/3/28.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { delContest, editContest, getContest, getContestDetail, updateContestProblems } from 'actions'
import ContestEdit from 'components/admin/Contest/ContestEdit'

@connect(
  state => ({
    contest: state.contests,
    loading: state.loading
  }),
  dispatch => bindActionCreators({
    getContestDetail,
    delContest,
    editContest,
    updateContestProblems,
    getContest
  }, dispatch),
)
class ContestEditContainer extends Component {
  componentDidMount () {
    try {
      !!this.props.params.cid && this.props.getContestDetail(this.props.params.cid)
    } catch (e) {
      console.error(e)
    }
  }
  render () {
    const {contest: {contest}, params: {cid}, delContest, loading, editContest} = this.props
    return (
      <ContestEdit
        contest={contest}
        cid={cid}
        loading={loading}
        delContest={delContest}
        editContest={editContest}
        updateContestProblems={updateContestProblems}
      />
    )
  }
}

export default ContestEditContainer
