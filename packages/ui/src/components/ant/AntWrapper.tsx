import React from 'react'

export interface AntWrapperProps {
  children: (props: object) => JSX.Element
}

/**
 * AntD will add some internal props for some kind of container components like `Menu`.
 *
 * @see https://github.com/ant-design/ant-design/issues/7846
 */
const AntWrapper = ({ children, ...props }: AntWrapperProps) => {
  return children(props)
}

export default AntWrapper
