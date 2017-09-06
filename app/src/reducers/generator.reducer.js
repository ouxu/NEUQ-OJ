import {GET_TEAM_LIST} from 'actions/type'

export default function generator(state = {}, action) {
  switch (action.type) {

    case GET_TEAM_LIST:
      return {
        ...state,
        teamList: action.data
      }
    default:
      return state
  }
}
