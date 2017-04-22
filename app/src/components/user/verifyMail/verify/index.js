/**
 * Created by out_xu on 17/4/18.
 */
import React from 'react'

const Verify = (props) => {
  return (
    <div>
      <p className='h-title' key='verify-mail-p-1'>验证邮件已发送至您的邮箱 {props.email}</p>
      <p className='h-title' key='verify-mail-p-2'>请登录邮箱进行验证以激活账号</p>
    </div>
  )
}

export default Verify
