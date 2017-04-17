/**
 * Created by out_xu on 17/4/18.
 */
import React from 'react'
import {Input} from 'antd'

const Verify = (props) => {
  return (
    <div>
      <p className="h-title" key="verify-mail-p-1">验证邮件已发送至你的邮箱 {props.email}</p>
      <p className="h-title" key="verify-mail-p-2">请登录邮箱并输入验证码以激活账号</p>
      <div className="verify-mail-input" key="verify-mail-input">
        <Input
          placeholder="请输入验证码"
          addonAfter={props.addonAfter}
          onChange={props.onInputChange}
          maxLength={6}
        />
      </div>
    </div>
  );
};

export default Verify;
