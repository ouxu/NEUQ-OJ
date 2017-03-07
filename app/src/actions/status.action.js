/**
 * Created by out_xu on 17/1/5.
 */
import {SET_STATUS_TABLE} from "./type";
import API from "../api";
import codeHelper from "../utils/codeHelper";
import urlEncode from '../utils/urlEncode'
/**
 * 获取当前提交状态
 * @param body
 */
export function getStatusTable(page=1, size=20) {
    return (dispatch) => {
        sessionStorage.setItem("neuq_oj.statuspagecurr", page)
        sessionStorage.setItem("neuq_oj.statuspagesize", size)

        return fetch(API.status + '?page=' + page + '&size=' + size, {
            method: 'GET'
        }).then((res) => {
            return res.json()
        }).then((json) => {
            if (json.code === 0) {
                dispatch(setStatusList(json.data))
            } else {
                codeHelper(json.code)
            }
        }).catch((e) => {
            console.log(e.message)
        })

    }
}

/**
 * 设置当前提交状态
 * @param body
 */
const setStatusList = (data) => {
    return {
        type: SET_STATUS_TABLE,
        payload: {
            data
        }
    }
}

/**
 * 筛选状态
 * @param body
 */
export function searchStatus(str, page=1, size=20) {
    return (dispatch) => {
        sessionStorage.setItem("neuq_oj.statuspagecurr", page)
        sessionStorage.setItem("neuq_oj.statuspagesize", size)
        return fetch(API.status+'?'+str+'&page='+page+'&size='+size, {
            method: 'GET'
        }).then((res) => {
            return res.json()
        }).then((json) => {
            if (json.code === 0) {
                sessionStorage.setItem("neuq_oj.statuspagecount", json.total_count)
                dispatch(setStatusList(json.data))
            } else {
                codeHelper(json.code)
            }
        }).catch((e) => {
            console.log(e.message)
        })
    }
}