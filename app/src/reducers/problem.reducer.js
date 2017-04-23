/**
 * Created by out_xu on 16/12/30.
 */
import { REMOVE_PROBLEM_DETAIL, SET_PROBLEM_DETAIL, SET_PROBLEM_TABLE } from 'actions/type'

const initProblem = {
  problemtable: {},
  problemdetail: {}
}

export default function problems (state = initProblem, action) {
  switch (action.type) {
    case SET_PROBLEM_TABLE:
      return {
        ...state,
        problemtable: action.payload
      }
    case SET_PROBLEM_DETAIL:
      return {
        ...state,
        problemdetail: action.payload
      }
    case REMOVE_PROBLEM_DETAIL:
      return {
        ...state,
        problemdetail: {}
      }
    default:
      return state
  }
}
