/**
 * Created by out_xu on 16/12/20.
 */
import { combineReducers } from 'redux'

import timeStamp from './utils.reducer'
import user from './user.reducer'
import home from './home.reducer'
import problems from './problem.reducer'
import machines from './machine.reducer'
import status from './status.reducer'
import contests from './contests.reducer'
import ranklist from './ranklist.reducer'
import admin from './admin.reducer'
import loading from './loading.reducer'
import groups from './groups.reducer'
const rootReducer = combineReducers({
  admin,
  contests,
  machines,
  groups,
  home,
  loading,
  problems,
  ranklist,
  status,
  timeStamp,
  user
})

export default rootReducer
