/**
 * Created by out_xu on 16/12/20.
 */
import {SET_HOMEPAGE_INFO} from "../actions/type";

export default function home(state = {}, action){
    switch (action.type){
        case SET_HOMEPAGE_INFO:
            return  {
                ...state,
                ...action.payload
            };
        default:
            return state
    }
}
