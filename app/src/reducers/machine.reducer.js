import {ADD_JUDGE_SERVER, GET_ALL_JUDGE_LIST, GET_JUDGE_LIST_AND_INFO, GET_JUDGE_SERVER_INFO} from 'actions/type'
// 这里注意一定要把machineTable初始化成数组
const initMachine = {
  machineAdd: {},
  machineTable: [],
  machineInfo: []
}
export default function machines(state = initMachine, action) {
  switch (action.type) {
    case ADD_JUDGE_SERVER:
      return {
        ...state,
        machineAdd: action.payload
      }
    case GET_ALL_JUDGE_LIST:
      return {
        ...state,
        machineTable: action.payload
      }
    case GET_JUDGE_SERVER_INFO:
      return {
        ...state,
        machineInfo: action.payload
      }
    default:
      return {
        ...state
      }
  }
}