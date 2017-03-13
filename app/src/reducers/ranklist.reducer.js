/**
 * Created by out_xu on 17/3/11.
 */
import {SET_RANK_TABLE} from "../actions/type";

export function ranklist(state = {}, action) {
    switch (action.type) {
        case SET_RANK_TABLE:
            return {
                ...state,
                ...action.payload
            };
        default :
            return state
    }
}