/**
 * Created by out_xu on 16/12/30.
 */
import { REMOVE_PROBLEM_DETAIL, SET_PROBLEM_DETAIL, SET_PROBLEM_TABLE } from 'actions/type'

const initProblem = {
  problemTable: {},
  problemDetail: {}
}

export default function problems (state = initProblem, action) {
  switch (action.type) {
    case SET_PROBLEM_TABLE:
      return {
        ...state,
        problemTable: action.payload
      }
    case SET_PROBLEM_DETAIL:
      return {
        ...state,
        problemDetail: action.payload
      }
    case REMOVE_PROBLEM_DETAIL:
      return {
        ...state,
        problemDetail: {}
      }
    default:
      return state
  }
}
