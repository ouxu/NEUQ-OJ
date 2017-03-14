/**
 * Created by out_xu on 16/12/20.
 */
import {SET_USERINFO, CLEAR_USERINFO} from "../actions/type";

const init_user = {
    userinfo: {}
};
export default function user(state = init_user, action) {
    switch (action.type) {
        case SET_USERINFO:
            return {
                ...state,
                userinfo: action.payload
            };
        case CLEAR_USERINFO:
            return {
                ...state,
                userinfo: {}
            };
        default:
            return state
    }
}
