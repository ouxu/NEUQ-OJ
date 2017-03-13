/**
 * Created by out_xu on 17/3/11.
 */
import {SET_RANK_TABLE} from "./type";
import API from '../api';
import codeHelper from '../utils/codeHelper';
import getToken from '../utils/getToken';
import jumpTo from '../utils/windowScroll';

/**
 * 获取排行榜
 * @param scope
 * @param page
 * @param size
 * @returns {function(*)}
 */
export function getRankTable(scope='total',page = 1, size = 20) {
    return (dispatch) => {
        sessionStorage.setItem("neuq_oj.ranklistpagecurr", page);
        sessionStorage.setItem("neuq_oj.ranklistpagesize", size);
        const token = getToken();
        return fetch(API.ranklist + '?scope=' + scope +'&page=' + page + '&size=' + size, {
            method: 'GET',
            headers: {
                "token": token
            }
        }).then((res) => {
            return res.json()
        }).then((json) => {
            if (json.code === 0) {
                dispatch(setRankTable(json.data));
                jumpTo('navigation')
            } else {
                codeHelper(json.code)
            }

        }).catch((e) => {
            console.log(e.message)
        })
    }
}

/**
 * 设置榜单数据
 * @param data
 * @returns {{type, payload: {data: *}}}
 */
const setRankTable = (data) => {
    return {
        type: SET_RANK_TABLE,
        payload: {
            data
        }
    }
};
