/**
 * Created by out_xu on 17/3/28.
 */


/**
 * 获取主页信息
 * @param home
 */
import API from "../api";
import * as requestService from "../utils/request";
import {SET_NEWS_LIST,SET_NEWS,actionCreater} from "./type";
import {message} from "antd";

export function getNewsList() {
    return async(dispatch) => {
        try {
            const param = {
                page: 1,
                size: 1000
            };
            const data = await requestService.get(API.news,param);
            await dispatch(actionCreater(SET_NEWS_LIST,data));
        } catch (e) {
            console.error(e);
        }
    };
}

export function getNews(id) {
    return async(dispatch) => {
        try {
            const data = await requestService.get(API.news+'/'+id);
            await dispatch(actionCreater(SET_NEWS,data));
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
            message.success('发布成功')
        } catch (e) {
            console.error(e);
        }
    };
}

export function delNews(id) {
    return async() => {
        try {
            await requestService.tget(API.news+'/'+ id+ '/delete');
            message.success('删除成功')
        } catch (e) {
            console.error(e);
        }
    };
}
