/**
 * Created by out_xu on 17/4/18.
 */
import React from 'react'
import { Input } from 'antd'
const Active = (props) => {
  return (
    <div>
      <p className='h-title' key='verify-mail-p-1'>如果你的账号已经注册但仍未激活，或者验证链接超时，请重新进行邮箱验证！</p>
      <p className='h-title' key='verify-mail-p-2'>验证邮件 60s 只能发送一次，请勿重复点击！</p>
      <div className='verify-mail-input' key='verify-mail-input'>
        <Input
          placeholder='请输入您的邮箱'
          addonAfter={props.addonAfter}
          onChange={props.onInputChange}
        />
      </div>
    </div>
  )
}

export default Active
