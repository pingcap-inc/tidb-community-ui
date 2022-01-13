import { useCommonHeaderData } from '../../datasource/home'
import React, { useMemo } from 'react'
import { HeaderButtonProps } from './HeaderButtons'
import { BellOutlined, MailOutlined } from '@ant-design/icons'
import { Site } from '../../utils/site'

/**
 * @deprecated
 * @param commonHeaderData
 */
export const useButtons = (commonHeaderData: ReturnType<typeof useCommonHeaderData>) => {
  const buttons: HeaderButtonProps[] = useMemo(() => {
    return [{
      icon: <MailOutlined />,
      badge: commonHeaderData?.privateMessages ?? false,
      key: 'messages',
      tooltip: '私信',
      to: {
        site: Site.home,
        url: '/private-messages',
        newWindow: false,
      },
    }]
  }, [commonHeaderData])
  return buttons
}
