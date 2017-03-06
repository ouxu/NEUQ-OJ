/**
 * Created by out_xu on 17/1/5.
 */
import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {getStatusTable,searchStatus} from '../actions';

import StatusTable from '../components/content/status'

class StatusContainer extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        const {status} = this.props;
        return (
            <div>
                <StatusTable data={status.data}
                             getStatusTable={this.props.action.getStatusTable}
                             searchStatus={this.props.action.searchStatus}
                />
            </div>
        )
    }
}

const mapStateToProps= (state) =>{
    return {
        status: state.status
    }
}

const mapDispatchToProps=(dispatch) =>{
    const actions = {getStatusTable,searchStatus};
    const actionMap = {action: bindActionCreators(actions,dispatch)}
    return actionMap;
}

export default connect(mapStateToProps,mapDispatchToProps)(StatusContainer)