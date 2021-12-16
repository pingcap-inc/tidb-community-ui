import React from 'react';
import './index.css'

import { Button, Row, Col } from 'antd';

const Buttons = ({ ghost, disabled, danger }) => {
  const sizes = ['small', 'middle', 'large']
  const types = ['default', 'primary', 'link', 'text', 'dashed']
  const attrs = { ghost, disabled, danger }

  return (
    <>
      <Row gutter={[8, 8]}>
        <Col offset={4} span={5}>xs<sup>*</sup></Col>
        <Col span={5}>small</Col>
        <Col span={5}>middle</Col>
        <Col span={5}>large</Col>
      </Row>
      {types.map(type => (
        <Row gutter={[8, 8]} key={type}>
          <Col span={4}>{type}</Col>
          <Col span={5}>
              <Button className='ant-btn-xs' {...attrs} type={type}>Button</Button>
            </Col>
          {sizes.map(size => (
            <Col span={5} key={size || 'base'}>
              <Button {...attrs} type={type} size={size}>Button</Button>
            </Col>
          ))}
        </Row>
      ))}
    </>
  )
}

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'antd/Buttons',
  component: Buttons,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Buttons {...args} />;

export const Preview = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Preview.args = {
  ghost: false,
  disabled: false,
  danger: false
};
