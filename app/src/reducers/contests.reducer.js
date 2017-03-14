/**
 * Created by out_xu on 17/2/21.
 */
import {SET_CONTESTS_TABLE, SET_CONTEST} from "../actions/type";


const init_contests = {
    contest: {},
    conteststable: {}
};

export default function contests(state = init_contests, action) {
    switch (action.type) {
        case SET_CONTESTS_TABLE:
            return {
                ...state,
                conteststable: action.payload
            };
        case SET_CONTEST :
            return {
                ...state,
                contest: action.payload
            };
        default:
            return state
    }
}
