import React from 'react'
import { Button } from 'antd'

const LoginButton = ({ className }: { className?: string }) => {
  return <Button className={className} size="small" type="primary">注册 / 登录</Button>
}
export default LoginButton
