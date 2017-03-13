/**
 * Created by out_xu on 16/12/20.
 */
import {SET_USERINFO, CLEAR_USERINFO} from "../actions/type";

export default function user(state = {}, action){
    switch (action.type){
        case SET_USERINFO:
            return  {
                ...state,
                ...action.payload
            };
        case CLEAR_USERINFO:
            return  {
            };
        //    清除state的user
        default:
            return state
    }
}
