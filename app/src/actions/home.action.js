/**
 * Created by out_xu on 16/12/23.
 */
/**
 * 获取主页信息
 * @param home
 */

import API from '../api';
import codeHelper from '../utils/codeHelper'
import {SET_HOMEPAGE_INFO} from "./type";

const setHomepageInfo = (data)=> {
    return {
        type: SET_HOMEPAGE_INFO,
        payload: {
            ...data
        }
    }
}
export function fetchHomePageData (){
    return (dispatch)=> {
        return fetch(API.homedata)
            .then((res) => res.json())
            .then((json) => {
                if (json.code===0){
                    dispatch(setHomepageInfo(json.data))
                } else {
                    codeHelper(json.code)
                }
            })
            .catch((e) => {
                console.log(e.message);
            });
    }
};