/**
 * Created by out_xu on 16/12/29.
 */
import React from 'react';
import UserPanel from '../components/content/userpage'

//连接redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getUserInfo,getUserMe} from '../actions/';

@connect(
    state => state.user,
    dispatch => bindActionCreators({getUserInfo,getUserMe}, dispatch)
)
class UserpageContainer extends React.Component {

    componentWillMount() {
        let id= localStorage.getItem("neuq_oj.id");

        this.props.params.id===id ?
            this.props.getUserMe():
            this.props.getUserInfo(this.props.params.id)
    }

    render (){
        const {userinfo} =this.props;
        return(
           <div>
               <UserPanel user={userinfo}/>
           </div>
        )
    }
}


export default UserpageContainer;