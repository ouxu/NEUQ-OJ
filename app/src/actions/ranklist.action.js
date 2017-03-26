/**
 * Created by out_xu on 17/3/11.
 */
import {SET_RANK_TABLE} from "./type";
import API from "../api";
import * as requestService from "../utils/request";
import jumpTo from "../utils/windowScroll";

/**
 * 设置榜单数据
 * @param data
 * @returns {{type, payload: {data: *}}}
 */
const setRankTable = data => ({
    type: SET_RANK_TABLE,
    payload: data

});

/**
 * 获取排行榜
 * @param scope
 * @param page
 * @param size
 * @returns {function(*)}
 */
export function getRankTable(page = 1, size = 20, scope = 'total') {
    return async(dispatch) => {
        try {
            const params = {
                scope,
                page,
                size
            };
            const data = await requestService.tget(API.ranklist, params);
            sessionStorage.setItem('neuq_oj.ranklistpagecurr', page);
            sessionStorage.setItem('neuq_oj.ranklistpagesize', size);
            await dispatch(setRankTable(data));

            jumpTo('navigation');
        } catch (e) {
            console.error(e);
        }
    };
}

