/**
 * Created by out_xu on 17/4/23.
 */
import React from 'react'
import { Input } from 'antd'
import { Link } from 'react-router'
const StepContent = (props) => {
  const {type, addonAfter, onInputChange} = props
  if (!!type && type.length > 10) {
    return null
  } else if (type === 'succ') {
    return (
      <div>
        <p className='h-title' key='verify-mail-p-1'>邮件发送成功！</p>
        <p className='h-title' key='verify-mail-p-2'>请登录邮箱进行验证以激活账号</p>
      </div>
    )
  } else if (type === 'done') {
    return (
      <div>
        <p className='h-title' key='verify-mail-p-1'>密码修改成功！
          <Link to='/'>
            返回首页
          </Link>
        </p>
        <p className='h-title' key='verify-mail-p-2'>请登录邮箱进行验证以激活账号</p>
      </div>
    )
  } else {
    return (
      <div>
        <p className='h-title' key='verify-mail-p-1'>我们需要通过邮箱验证，我们将向您的邮箱发送验证邮件，请注意查收。</p>
        <p className='h-title' key='verify-mail-p-2'>验证邮件 60s 只能发送一次，请勿重复点击！当验证邮件过期时会提醒用户不存在，请重新发送验证邮件！</p>
        <div className='verify-mail-input' key='verify-mail-input'>
          <Input
            placeholder='请输入您的邮箱'
            addonAfter={addonAfter}
            onChange={onInputChange}
          />
        </div>
      </div>
    )
  }
}

export default StepContent
