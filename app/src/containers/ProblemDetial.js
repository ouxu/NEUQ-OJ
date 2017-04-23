/**
 * Created by out_xu on 17/1/3.
 */
import React from 'react'
// 连接redux TODO 题目提示
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getProblemInfo, tokenVerify } from 'actions'
import ProblemDetail from 'components/content/Problems/ProblemDetail'

@connect(
  state => state.problems,
  dispatch => bindActionCreators({getProblemInfo, tokenVerify}, dispatch),
)
class ProblemDetailContainer extends React.Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
    this.props.getProblemInfo(this.props.params)
  }

  render () {
    const {problemDetail, tokenVerify} = this.props
    return (
      <ProblemDetail
        params={this.props.params}
        data={problemDetail}
        tokenVerify={tokenVerify}
      />
    )
  }
}

export default ProblemDetailContainer
