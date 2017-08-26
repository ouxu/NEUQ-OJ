import {GET_Team_LIST} from 'actions/type'

export default function generator (state = {}, action) {
  switch (action.type) {
    case GET_Team_LIST:
      return {
        ...state,
        teamList:action.payload
      }
    default:
      return state
  }
}
