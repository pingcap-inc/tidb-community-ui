import { Row, Col, Typography } from 'antd'

export default function ColorBox ({ name, color }) {
  return (
    <Row direction="horizontal" size={32} align='middle'>
      <Col span={2}>
        <Typography.Text type="secondary">{name}</Typography.Text>
      </Col>
      <Col span={2}>
        <div style={{ width: 30, height: 30, background: color, borderRadius: 6, boxShadow: `#00000040 0 0 8px` }} />
      </Col>
      <Col offset={4} span={16}>
        <Typography.Text>{color}</Typography.Text>
      </Col>
    </Row>
  )
}
