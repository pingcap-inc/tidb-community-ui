import { Header, SiteComponentsContext } from '@pingcap-inc/tidb-community-site-components'
import React, { useCallback, useEffect } from 'react'
import { mutate } from 'swr'
import notificationsJson from './notification.json'

const HeaderPreview = ({ notifications, privateMessages, loggedIn }) => {

  useEffect(() => {
    mutate(['me'], null)
  }, [loggedIn])

  useEffect(() => {
    mutate(['common.headerData'])
  }, [notifications, privateMessages])

  const accounts = useCallback((key) => {
    if (key === 'me') {
      if (loggedIn) {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve({
              data: {
                avatar_url: 'https://asktug.com/letter_avatar_proxy/v4/letter/d/13edae/50.png',
                id: 12345,
                username: 'fake'
              }
            })
          }, 2000)
        })
      } else {
        return Promise.reject()
      }
    }
  }, [loggedIn])

  const asktug = useCallback((key) => {
    if (key === 'asktug.getNotifications') {
      return Promise.resolve(notificationsJson)
    }
  }, [])

  return (
    <SiteComponentsContext.Provider value={{ fetchers: { accounts, asktug } }}>
      <Header />
    </SiteComponentsContext.Provider>
  )
}

export default {
  title: 'site/Header',
  component: HeaderPreview
}

const Template = (args) => <HeaderPreview {...args} />

export const Preview = Template.bind({})

Preview.args = {
  loggedIn: true,
  notifications: false,
  privateMessages: true
}

