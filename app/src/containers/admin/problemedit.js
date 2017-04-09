/**
 * Created by out_xu on 17/4/8.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { clearProblem, editProblem, getProblemInfo } from '../../actions'

import ProblemEdit from '../../components/admin/problem/problemedit'

@connect(
  state => ({
    problems: state.problems,
    loading: state.loading
  }),
  dispatch => bindActionCreators({getProblemInfo, editProblem, clearProblem}, dispatch)
)
class ProblemEditContainer extends Component {
  componentDidMount () {
    this.props.params.id ? this.props.getProblemInfo(this.props.params) : this.props.clearProblem();
  }

  render () {
    const {problems: {problemdetail}, params: {id}, loading, editProblem} = this.props
    return (
      <ProblemEdit
        data={problemdetail}
        id={id}
        loading={loading}
        editProblem={editProblem}
      />
    );
  }
}

export default ProblemEditContainer;
