/**
 * Created by out_xu on 16/12/20.
 */
import {combineReducers} from 'redux';
import user from './user.reducer';
import home from './home.reducer'
import {problemtable,problemdetail} from './problem.reducer'
import status from './status.reducer';
import {conteststable,contest} from './contests.reducer'
const rootReducer = combineReducers({
    user,
    home,
    problemtable,
    problemdetail,
    status,
    conteststable,
    contest,

});

export default rootReducer;
