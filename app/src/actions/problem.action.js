/**
 * Created by out_xu on 16/12/30.
 */
import {SET_PROBLEM_TABLE,SET_PROBLEM_DETAIL,SET_PROBLEM_RESULT} from "./type";
import API from "../api";
import codeHelper from "../utils/codeHelper";
import goto from '../utils/goto'
import jumpTo from '../utils/windowScroll'
/**
 * 获取问题列表
 * @param body
 */
export function getProblemTable(page=1, size=20) {
    return (dispatch)=> {
        //将当前输入的页码存入sessionStorage
        sessionStorage.setItem("neuq_oj.problempagecurr", page);
        sessionStorage.setItem("neuq_oj.problempagesize", size);
        const token = localStorage.getItem('neuq_oj.token');
        return fetch(API.problems + '?page=' + page + '&size=' + size, {
            method: 'GET',
            headers: {
                "token": token
            }
        }).then((res)=> {
            return res.json()
        }).then((json)=> {
            if (json.code === 0) {
                sessionStorage.setItem("neuq_oj.problempagecount", json.total_count);
                dispatch(setProblemList(json.data));
                jumpTo('navigation')
            } else {
                codeHelper(json.code)
            }

        }).catch((e)=> {
            console.log(e.message)
        })
    }
}

/**
 * 设置当前问题列表
 * @param body
 */
const setProblemList = (data)=> {
    return {
        type: SET_PROBLEM_TABLE,
        payload: {
            data
        }
    }
};

/**
 * 获取某个题目
 * @param body
 */
export function getProblemInfo(params) {

    const url= params.pnum?API.host+'contest/'+params.cid+'/problem/'+ params.pnum:API.host+'problem/'+params.id;

    return (dispatch)=>{
        return fetch(url,{
            method: 'GET'
        }).then((res)=> {
            return res.json()
        }).then((json)=>{
            if (json.code === 0){
                dispatch(setProblemDetail(json.data))
            } else {
                codeHelper(json.code)
            }
        }).catch((e)=>{
            console.log(e.message)
        })
    }
}

/**
 * 设置当前问题详情
 * @param body
 */
const setProblemDetail = (data)=> {
    return {
        type: SET_PROBLEM_DETAIL,
        payload: {
            data
        }
    }
};

/**
 * 搜索问题
 * @param body
 */
export function searchProblems(value,page=1,size=20) {
    return (dispatch)=> {
        sessionStorage.setItem("neuq_oj.problempagecurr", page);
        sessionStorage.setItem("neuq_oj.problempagesize", size);

        return fetch(API.problemssearch+'?keyword=' + value+ '&page=' +page+'&size='+size, {
            method: 'GET'
        }).then((res)=>{
            return res.json()
        }).then((json)=>{
            if (json.code === 0){
                sessionStorage.setItem("neuq_oj.problempagecount", json.total_count);
                dispatch(setProblemList(json.data));
                jumpTo('navigation')
            } else {
                codeHelper(json.code)
            }
        }).catch((e)=>{
            console.log(e.message)
        })
    }
}

/**
 * 提交问题
 *
 * 组件内进行 未集中管理
 */

