/**
 * Created by out_xu on 17/2/21.
 */
import React, {
    Component
} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getRankTable} from "../actions";

import RankList from '../components/content/ranklist';

@connect(
    state => state.ranklist,
    dispatch => bindActionCreators({getRankTable}, dispatch)
)
class RanklistContainer extends Component {
    render() {
        const {ranklist}=this.props;
        return (
            <div>
               <RankList
                   getRankTable = {this.props.getRankTable}
                   data = {ranklist.data}
               />
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        ranklist: state.ranklist
    }
};

const mapDispatchToProps = (dispatch) => {
    const actions = {getRankTable};
    return {
        action: bindActionCreators(actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RanklistContainer);


