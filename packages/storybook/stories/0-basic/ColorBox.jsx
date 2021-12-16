import { Space, Typography } from 'antd'

export default function ColorBox ({ name, color }) {
  return (
    <Space direction="horizontal" size={32}>
      <Typography.Text type="secondary">{name}</Typography.Text>
      <div style={{ width: 30, height: 30, background: color }} />
      <Typography.Text>{color}</Typography.Text>
    </Space>
  )
}
