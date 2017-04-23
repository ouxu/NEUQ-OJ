/**
 * Created by out_xu on 17/4/20.
 */
import React from 'react'
import { Card, Steps } from 'antd'
import QueueAnim from 'rc-queue-anim'
import { Link } from 'react-router'
const Step = Steps.Step

const Actived = () => {
  return (
    <Card className='verify-mail-wrap'>
      <QueueAnim type='bottom'>
        <div className='verify-mail-header' key='verify-mail-wrap'>
          <h1 className='verify-mail-header-title'>邮箱激活</h1>
        </div>
        <Steps
          current={2}
          className='verify-mail-header-step'
          key='verify-mail-header-step'
        >
          <Step title='注册' />
          <Step title='激活' />
          <Step title='Done' />
        </Steps>
        <p className='h-title' key='verify-mail-p-2'>
          邮箱激活成功！
          <Link to='/'>
            返回首页
          </Link>
        </p>
      </QueueAnim>
    </Card>
  )
}

export default Actived
