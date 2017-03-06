/**
 * Created by out_xu on 16/12/30.
 */
import {SET_PROBLEM_TABLE,SET_PROBLEM_DETAIL,SET_PROBLEM_RESULT } from '../actions/type'

export function problemtable(state={},action){
    switch (action.type) {
        case SET_PROBLEM_TABLE:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export function problemdetail(state={},action){
    switch (action.type) {
        case SET_PROBLEM_DETAIL:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}
