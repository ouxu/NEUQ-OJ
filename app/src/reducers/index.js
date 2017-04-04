/**
 * Created by out_xu on 16/12/20.
 */
import {combineReducers} from 'redux'

import timeStamp from './utils.reducer'
import user from './user.reducer'
import home from './home.reducer'
import problems from './problem.reducer'
import status from './status.reducer'
import contests from './contests.reducer'
import ranklist from './ranklist.reducer'
import admin from './admin.reducer'
const rootReducer = combineReducers({
  admin,
  contests,
  home,
  problems,
  ranklist,
  user,
  status,
  timeStamp
})

export default rootReducer
