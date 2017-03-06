/**
 * Created by out_xu on 16/12/29.
 */
import React from 'react';
import UserPanel from '../components/content/userpage'

//连接redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getUserInfo,getUserMe} from '../actions/';

class UserpageContainer extends React.Component {

    componentWillMount() {
        let id= localStorage.getItem("neuq_oj.id");

        this.props.params.id===id ?
            this.props.action.getUserMe():
            this.props.action.getUserInfo(this.props.params.id)
    }

    render (){
        const {user} =this.props;
        return(
           <div>
               <UserPanel user={user}/>
           </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        user: state.user
    }
}

const mapDispatchToProps=(dispatch)=>{
    const actions = {getUserInfo,getUserMe}
    const actionMap = {action: bindActionCreators(actions,dispatch)}
    return actionMap;
}

export default connect(mapStateToProps,mapDispatchToProps)(UserpageContainer)