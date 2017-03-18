/**
 * Created by out_xu on 17/2/21.
 */
import {SET_CONTESTS_TABLE, GET_CONTEST_SUCC,GET_CONTEST_ERR} from "../actions/type";


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
        case GET_CONTEST_SUCC :
            return {
                ...state,
                contest: action.payload
            };
        case GET_CONTEST_ERR :
            return {
                ...state,
                contest: action.payload
            };
        default:
            return state
    }
}
