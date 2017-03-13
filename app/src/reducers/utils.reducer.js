/**
 * Created by out_xu on 17/3/12.
 */

import {SET_TIME_STAMP} from '../actions/type';

export default function timeStamp(state={},action) {
    switch (action.type) {
        case SET_TIME_STAMP:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state
    }
}