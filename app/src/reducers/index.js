/**
 * Created by out_xu on 16/12/20.
 */
import {combineReducers} from 'redux';

import timeStamp from './utils.reducer';
import user from './user.reducer';
import home from './home.reducer'
import {problemtable,problemdetail} from './problem.reducer'
import status from './status.reducer';
import {conteststable,contest} from './contests.reducer'
import {ranklist} from './ranklist.reducer'

const rootReducer = combineReducers({
    contest,
    conteststable,
    home,
    problemtable,
    problemdetail,
    ranklist,
    status,
    timeStamp,
    user

});

export default rootReducer;
