/**
 * Created by out_xu on 17/1/5.
 */
import {SET_STATUS_TABLE} from "../actions/type";

const init_status = {
    statustable: {}
};

export default function status(state = init_status, action) {
    switch (action.type) {
        case SET_STATUS_TABLE:
            return {
                ...state,
                statustable: action.payload
            };
        default:
            return state
    }
}