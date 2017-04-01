/**
 * Created by out_xu on 17/3/25.
 */
import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {delNews, editNews, getNewsList} from "../../actions";

import NewsManage from "../../components/admin/news";

@connect(
    state => ({
        admin: state.admin
    }),
    dispatch => bindActionCreators({getNewsList, editNews, delNews}, dispatch),
)
class NewsManageContainer extends Component {

    componentDidMount() {
        this.props.getNewsList()
    }

    render() {
        const {admin: {newslist}, editNews, getNewsList, delNews} = this.props;
        return (
            <NewsManage
                news={newslist.news || []}
                editNews={editNews}
                getNewsList={getNewsList}
                delNews={delNews}
            />
        );
    }
}

export default NewsManageContainer;
