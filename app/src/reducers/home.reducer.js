/**
 * Created by out_xu on 16/12/20.
 */
import {SET_HOMEPAGE_INFO} from "../actions/type";

const init_home = {
    home: {}
};
export default function home(state = init_home, action) {
    switch (action.type) {
        case SET_HOMEPAGE_INFO:
            return {
                ...state,
                home: action.payload
            };
        default:
            return state
    }
}
