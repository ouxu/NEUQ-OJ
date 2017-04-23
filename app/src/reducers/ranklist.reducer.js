/**
 * Created by out_xu on 17/3/11.
 */
import { SET_RANK_TABLE } from 'actions/type'

const initRanklist = {
  rankList: []
}
export default function ranklist (state = initRanklist, action) {
  switch (action.type) {
    case SET_RANK_TABLE:
      return {
        ...state,
        rankList: action.payload
      }
    default :
      return state
  }
}
