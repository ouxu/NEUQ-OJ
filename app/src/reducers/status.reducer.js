/**
 * Created by out_xu on 17/1/5.
 */
import {SET_STATUS_TABLE} from '../actions/type';

export default function status(state={},action) {
    switch (action.type){
        case SET_STATUS_TABLE:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}