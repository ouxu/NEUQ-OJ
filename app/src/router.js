import React from "react";
import {Router, Route, IndexRoute, hashHistory} from "react-router";
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
import Test from "./components/plugins/test";


// 配置路由，并将路由注入到id为app的DOM元素中，后期需要React-router-ensure
const RouterApp = (
    <Router history={hashHistory}>
        <Route path="/" component={AppComponent}>
            <IndexRoute component={HomePageContainer}/>
            <Route path="homepage" component={HomePageContainer}/>
            <Route path="problems" component={ProblemsContainer}>
                <Route path=":id" component={ProblemDetailContainer}/>
            </Route>

            <Route path="userpage/:id" component={UserPageContainer}/>

            <Route path="register" component={Register}/>
            <Route path="status" components={StatusContainer}>
                <Route path=":id" component={StatusContainer}/>
            </Route>
            <Route path="ranklist" component={RanklistContainer}/>
            <Route path="contests" component={ContestsContainer}>
                <Route path=":cid" component={ContestInfoContainer}>
                    <Route path="problem/:pnum" component={ProblemDetailContainer}/>
                </Route>
            </Route>

            <Route path="test" component={Test}/>
            <Route path='404' component={NotFoundPage}/>

        </Route>

    </Router>
);

export default RouterApp;