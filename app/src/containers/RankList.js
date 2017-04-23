/**
 * Created by out_xu on 17/2/21.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getRankTable } from 'actions'
import RankList from 'components/content/Ranklist'

@connect(
  state => state.ranklist,
  dispatch => bindActionCreators({getRankTable}, dispatch),
)
class RanklistContainer extends Component {
  render () {
    const {rankList} = this.props
    return (
      <RankList
        getRankTable={this.props.getRankTable}
        data={rankList}
      />
    )
  }
}

export default RanklistContainer
