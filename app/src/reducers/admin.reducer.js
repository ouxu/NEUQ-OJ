/**
 * Created by out_xu on 17/3/28.
 */

import {SET_NEWS_LIST,SET_NEWS} from '../actions/type';


const init_admin = {
    news:{},
    newslist: {}
};

export default function admin(state = init_admin, action) {
    switch (action.type) {
        case SET_NEWS_LIST:
            return {
                ...state,
                newslist: action.payload
            };
        case SET_NEWS:
            return {
                ...state,
                news: action.payload
            };
        default:
            return state;
    }
}
