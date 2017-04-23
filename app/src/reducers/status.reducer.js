/**
 * Created by out_xu on 17/1/5.
 */
import { SET_STATUS_TABLE } from 'actions/type'

const initStatus = {
  statusTable: []
}

export default function status (state = initStatus, action) {
  switch (action.type) {
    case SET_STATUS_TABLE:
      return {
        ...state,
        statusTable: action.payload
      }
    default:
      return state
  }
}
