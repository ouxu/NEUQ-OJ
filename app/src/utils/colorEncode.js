/**
 * Created by out_xu on 17/4/1.
 */
import React from 'react'

import { sec2Str } from 'utils'

export default (record, i, first_ac = []) => {
  let bgColor = 'eeeeee'
  let aa
  if (record.problem_ac_sec[i] && record.problem_ac_sec[i] > 0) {
    aa = record.problem_wa_num[i] ? 0x33 + (record.problem_wa_num[i] * 32) : '00'
    aa = aa > 0xaa ? 0xaa : aa
    aa = aa.toString(16)
    bgColor = aa + 'ff' + aa
    if (first_ac[i] === record.user_id) {
      bgColor = 'aaaaff'
    }
    return <div style={{height: '100%', backgroundColor: '#' + bgColor}}>
      <span
        style={{padding: 5}}>{sec2Str(record.problem_ac_sec[i])} {record.problem_wa_num[i] ? '(-' + record.problem_wa_num[i] + ')' : ''} </span>
    </div>
  } else if (record.problem_wa_num[i] && record.problem_wa_num[i] > 0) {
    aa = 0xaa - record.problem_wa_num[i] * 10
    aa = aa > 16 ? aa : 16
    aa = aa.toString(16)

    bgColor = 'ff' + aa + aa
    return <div style={{height: '100%', backgroundColor: '#' + bgColor}}>
      <span>{'-' + record.problem_wa_num[i]}</span>
    </div>
  }
}
