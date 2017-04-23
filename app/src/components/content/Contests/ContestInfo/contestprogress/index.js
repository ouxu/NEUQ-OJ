/**
 * Created by out_xu on 17/3/7.
 */
import React from 'react'
import { Progress } from 'antd'
import './index.less'
import { newDate } from 'utils'
const ContestProgress = (props) => {
  const {time, start_time, end_time} = props
  const start = newDate(start_time)
  const end = newDate(end_time)

  const h = Math.floor((end - time) / 1000 / 60 / 60)
  const m = Math.floor(((end - time) / 1000 - h * 60 * 60) / 60)
  const s = Math.floor(((end - time) / 1000 - h * 60 * 60 - m * 60))
  const endStatus = time > end

  return (
    <div className='contest-info-progress'>
      <div className='contest-info-progress-item'>
        <Progress
          status={(endStatus && 'success') || 'active'}
          percent={(endStatus && 100) || (parseInt(100 * (time - start) / (end - start)))}
          strokeWidth={8}
          className='contest-info-progress-progress'
        />
      </div>
      <div className='contest-info-progress-time'>
        {
          endStatus
            ? <span className='contest-info-progress-time-over'>已结束</span>
            : <span>
              <span> {h} </span> h
                <span> {m} </span> m
                <span> {s} </span> s
              </span>
        }
      </div>
    </div>
  )
}

export default ContestProgress
