/**
 * Created by out_xu on 17/3/25.
 */
import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchHomePageData} from "../actions";

import HomeManage from '../components/admin/home';

@connect(
    state => ({
        home: state.home
    }),
    dispatch => bindActionCreators({fetchHomePageData}, dispatch),
)
class HomeManageContainer extends Component {

    render() {
        const {home} = this.props;
        return (
            <HomeManage
                data={home.home}
            />
        );
    }
}


export default HomeManageContainer;
