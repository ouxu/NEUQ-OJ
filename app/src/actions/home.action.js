/**
 * Created by out_xu on 16/12/23.
 */
/**
 * 获取主页信息
 * @param home
 */
import API from "../api";
import * as requestService from "../utils/request";
import {SET_HOMEPAGE_INFO,SET_HOME_NEWS} from "./type";

const setHomepageInfo = data => ({
    type: SET_HOMEPAGE_INFO,
    payload: data
});
const setHomepageNews = data => ({
    type: SET_HOME_NEWS,
    payload: data
});

export function fetchHomePageData() {
    return async(dispatch) => {
        try {
            const homedata = await requestService.get(API.homedata);
            // const homenews = await requestService.get(API.newslatest);
            await dispatch(setHomepageInfo(homedata));
            // await dispatch(setHomepageNews(homenews));
        } catch (e) {
            console.error(e);
        }
    };
}

