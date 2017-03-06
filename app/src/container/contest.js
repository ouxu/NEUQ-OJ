/**
 * Created by out_xu on 17/2/21.
 */
import React from 'react';
import ContestPage from '../components/content/contests';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getContestsTable,searchContests} from '../actions';

class ContestsContainer extends React.Component{
    render (){
        const {conteststable}=this.props;
        return(
            <div>
                {
                    this.props.children
                    ||
                    <ContestPage data={conteststable.data}
                                 getContestsTable={this.props.action.getContestsTable}
                                 searchContests={this.props.action.searchContests}
                    />
                }
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return {
        conteststable: state.conteststable
    }
}

const mapDispatchToProps=(dispatch)=>{
    const actions = {getContestsTable,searchContests};
    const actionMap = {action: bindActionCreators(actions ,dispatch)};
    return actionMap;
}


export default connect(mapStateToProps, mapDispatchToProps)(ContestsContainer);