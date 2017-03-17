/**
 * Created by out_xu on 17/2/21.
 */
import {SET_CONTESTS_TABLE, SET_CONTEST} from "./type";
import API from "../api";
import codeHelper from "../utils/codeHelper";
import goto from "../utils/goto";
import * as requestService from "../utils/request";
import jumpTo from "../utils/windowScroll";
import getToken from "../utils/getToken";


/**
 * 设置竞赛列表
 * @param data
 */
const setContestsList = data => ({
    type: SET_CONTESTS_TABLE,
    payload: {
        data
    }
});

/**
 * 设置当前竞赛详情
 * @param data
 */
const setContest = data => ({
    type: SET_CONTEST,
    payload: {
        data
    }
});


/**
 * 获取竞赛列表
 * @param page 页码
 * @param size 条数
 * @returns {function(*)} dispatch action
 */
export function getContestsTable(page = 1, size = 20) {
    return async(dispatch) => {
        try {
            // 将当前输入的页码存入sessionStorage
            sessionStorage.setItem('neuq_oj.contestspagecurr', page);
            sessionStorage.setItem('neuq_oj.contestspagesize', size);

            const params = {
                page: page,
                size: size
            };
            const json = await requestService.get(API.contests, params);
            sessionStorage.setItem('neuq_oj.contestspagecount', json.total_count);
            dispatch(setContestsList(json.data));
            jumpTo('navigation');
        } catch (err) {
            throw new Error(err)
        }

    }
}


/**
 * 搜索竞赛
 * @param value 搜索字段
 * @param page 页码
 * @param size 条数
 * @returns {function(*)} dispatch action
 */
export function searchContests(value, page = 1, size = 20) {
    return async(dispatch) => {
        try {
            sessionStorage.setItem('neuq_oj.contestspagecurr', page);
            sessionStorage.setItem('neuq_oj.contestspagesize', size);
            const params = {
                keyword: value,
                page: page,
                size: size
            };
            const json = await requestService.get(API.contestssearch, params)
            sessionStorage.setItem('neuq_oj.contestspagecount', json.total_count);
            dispatch(setContestsList(json.data));
            jumpTo('navigation');
        } catch (err) {
            throw new Error(err)
        }
    }
}


/**
 * 获取竞赛问题
 * @param id 问题ID
 * @returns {function(*)} dispatch action
 */
export function getContest(id) {
    return async(dispatch) => {
        try {
            const headers = {
                token: getToken()
            };
            const json= await requestService.get(API.contest + id, '', headers)
            dispatch(setContest(json.data));
            jumpTo('navigation');

        } catch (err) {
            goto('/contests');
        }

    }
}


/**
 * 加入竞赛
 * @param id 竞赛ID
 * @param body 验证密码
 * @returns {function()}
 */
export function joinContest(id, body) {
    return () => {
        const token = getToken();
        fetch(`${API.contest + id}/join`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                token
            },
            body: JSON.stringify(body)
        }).then(res => res.json()).then((json) => {
            if (json.code === 0) {
                goto(`contests/${id}`);
            } else {
                goto('/contests');
                codeHelper(json.code);
            }
        }).catch((e) => {
            console.log(e.message);
        });
    };
}
