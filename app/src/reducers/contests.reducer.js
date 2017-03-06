/**
 * Created by out_xu on 17/2/21.
 */
import {SET_CONTESTS_TABLE,SET_CONTEST} from '../actions/type';

export function conteststable(state={},action) {
    switch (action.type) {
        case SET_CONTESTS_TABLE:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}
export function contest(state={},action) {
    switch (action.type) {
        case SET_CONTEST :
            return{
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}