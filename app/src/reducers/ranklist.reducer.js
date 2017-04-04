/**
 * Created by out_xu on 17/3/11.
 */
import { SET_RANK_TABLE } from '../actions/type'

const initRanklist = {
  ranklist: []
}
export default function ranklist (state = initRanklist, action) {
  switch (action.type) {
    case SET_RANK_TABLE:
      return {
        ...state,
        ranklist: action.payload
      }
    default :
      return state
  }
}
