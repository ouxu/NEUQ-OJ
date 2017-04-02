/**
 * Created by out_xu on 16/12/23.
 */
/**
 * 获取主页信息
 * @param home
 */
import API from "../api";
import * as requestService from "../utils/request";
import {/**SET_HOMEPAGE_INFO,**/SET_HOME_NEWS,actionCreater} from "./type";

export function fetchHomePageData() {
    return async(dispatch) => {
        try {
            // const homedata = await requestService.get(API.homedata);
            const homenews = await requestService.get(API.newslatest);
            // await dispatch(actionCreater(SET_HOMEPAGE_INFO,homedata));
            await dispatch(actionCreater(SET_HOME_NEWS,homenews));
        } catch (e) {
            console.error(e);
        }
    };
}

