/**
 * Created by out_xu on 16/12/23.
 */
/**
 * 获取主页信息
 * @param home
 */
import API from "../api";
import * as requestService from "../utils/request";
import {SET_HOMEPAGE_INFO} from "./type";

const setHomepageInfo = data => ({
    type: SET_HOMEPAGE_INFO,
    payload: data
});

export function fetchHomePageData() {
    return async(dispatch) => {
        try {
            const data = await requestService.get(API.homedata);
            await dispatch(setHomepageInfo(data));
        } catch (e) {
            console.error(e);
        }
    };
}

