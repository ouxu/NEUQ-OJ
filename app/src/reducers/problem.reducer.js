/**
 * Created by out_xu on 16/12/30.
 */
import { SET_PROBLEM_TABLE, SET_PROBLEM_DETAIL } from '../actions/type';

const init_problem = {
  problemtable: {},
  problemdetail: {}
};


export default function problems(state = init_problem, action) {
  switch (action.type) {
    case SET_PROBLEM_TABLE:
      return {
        ...state,
        problemtable: action.payload
      };
    case SET_PROBLEM_DETAIL:
      return {
        ...state,
        problemdetail: action.payload
      };
    default:
      return state;
  }
}

