import React from "react";
import {Router, Route, IndexRoute, hashHistory, browserHistory} from "react-router";
// 引入单个页面（包括嵌套的子页面）
import AppComponent from "./components";
import NotFoundPage from "./components/plugins/nofind/nofind.js";
import Register from "./components/user/register";
import HomePageContainer from "./container/homepage";
import ProblemsContainer from "./container/problems";
import ProblemDetailContainer from "./container/problemdetial";
import UserPageContainer from "./container/userpage";
import StatusContainer from "./container/status";
import ContestsContainer from "./container/contest";
import ContestInfoContainer from "./container/contestinfo";
import RanklistContainer from "./container/ranklist";
import AdminComponent from "./components/admin";
import HomeManageContainer from "./container/admin/home"
import ContestManageContainer from "./container/admin/contest"


// 配置路由，并将路由注入到id为app的DOM元素中，后期需要React-router-ensure
// TODO onEnter
const checkdata = store => (location, replaceWith) => {
};

const history = process.env.NODE_ENV === 'development' ? hashHistory : browserHistory;

const RouterApp = store => (
    <Router history={history}>
        <Route path="/" component={AppComponent}>
            <IndexRoute component={HomePageContainer}/>
            <Route path="homepage" component={HomePageContainer}/>
            <Route path="problems">
                <IndexRoute component={ProblemsContainer}/>
                <Route path=":id" component={ProblemDetailContainer}/>
            </Route>
            <Route path="userpage/:id" component={UserPageContainer}/>

            <Route path="register" component={Register}/>
            <Route path="status" components={StatusContainer}>
                <Route path=":id" component={StatusContainer}/>
            </Route>
            <Route path="ranklist" component={RanklistContainer}/>

            <Route path="contests">
                <IndexRoute component={ContestsContainer}/>

                <Route path=":cid">
                    <IndexRoute component={ContestInfoContainer}/>
                    <Route path="problem/:pnum" component={ProblemDetailContainer}/>
                </Route>
            </Route>

            <Route path="404" component={NotFoundPage}/>

        </Route>

        <Route path="admin" component={AdminComponent} onEnter={checkdata(store)}>
            <IndexRoute component={HomeManageContainer}/>
            <Route path="home" component={HomeManageContainer}/>

            <Route path="contest">
                <Route path="list" component={ContestManageContainer}/>

            </Route>

        </Route>
    </Router>
);


export default RouterApp;
