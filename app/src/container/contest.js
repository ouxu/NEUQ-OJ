/**
 * Created by out_xu on 17/2/21.
 */
import React from 'react';
import ContestPage from '../components/content/contests';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getContestsTable,searchContests,joinContest} from '../actions';


@connect(
    state => state.conteststable,
    dispatch => bindActionCreators({getContestsTable,searchContests,joinContest}, dispatch)
)
class ContestsContainer extends React.Component{
    render (){
        const {data}=this.props;
        return(
            <div>
                {
                    this.props.children
                    ||
                    <ContestPage data={data}
                                 getContestsTable={this.props.action.getContestsTable}
                                 searchContests={this.props.action.searchContests}
                                 joinContest={this.props.action.joinContest}
                    />
                }
            </div>
        )
    }
}

export default ContestsContainer