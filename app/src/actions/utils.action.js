/**
 * Created by out_xu on 17/3/12.
 */

import {SET_TIME_STAMP} from './type';

/**
 * 设置时间戳
 */
export function setTimeStamp() {
    return (dispatch)=> {
        dispatch(()=>{
            return {
                type: SET_TIME_STAMP,
                payload: {
                    timeStamp: new Date()
                }
            }
        })
    }
}


