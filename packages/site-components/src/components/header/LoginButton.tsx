import React from 'react'
import { Button } from 'antd'
import { login } from '../../utils/account'

const LoginButton = ({ className }: { className?: string }) => {
  return <Button className={className} size="small" type="primary" onClick={login}>注册 / 登录</Button>
}
export default LoginButton
