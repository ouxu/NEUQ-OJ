/**
 * Created by out_xu on 17/3/28.
 */


/**
 * 获取主页信息
 * @param home
 */
import API from "../api";
import * as requestService from "../utils/request";
import {SET_NEWS_LIST,SET_NEWS} from "./type";

const setNewsList = data => ({
    type: SET_NEWS_LIST,
    payload: data
});
const setNews = data => ({
    type: SET_NEWS,
    payload: data
});


export function getNewsList() {
    return async(dispatch) => {
        try {
            const param = {
                page: 1,
                size: 1000
            };
            const data = await requestService.get(API.news,param);
            await dispatch(setNewsList(data));
        } catch (e) {
            console.error(e);
        }
    };
}

export function getNews(id) {
    return async(dispatch) => {
        try {
            const data = await requestService.get(API.news+'/'+id,param);
            await dispatch(setNews(data));
        } catch (e) {
            console.error(e);
        }
    };
}

export function editNews(body,id) {
    return async() => {
        try {
            let url = id ? API.news+'/'+ id+ '/update':API.createnews;
            await requestService.tpost(url,body);
        } catch (e) {
            console.error(e);
        }
    };
}

export function delNews(id) {
    return async() => {
        try {
            await requestService.tget(API.news+'/'+ id+ '/delete');
        } catch (e) {
            console.error(e);
        }
    };
}
