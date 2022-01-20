import { Header, SiteComponentsContext } from '@pingcap-inc/tidb-community-site-components'
import React, { useCallback, useEffect } from 'react'
import { mutate } from 'swr'
import asktugNotificationsJson from '../asktug-notification.json'
import blogNotificationsJson from '../blog-notification.json'
import privateMessagesJson from './private-messages.json'

const sleep = (ms = 2000) => new Promise(resolve => {
  setTimeout(() => {
    resolve()
  }, ms)
})

const HeaderPreview = ({ loggedIn }) => {

  useEffect(() => {
    mutate(['me'], null).then()
  }, [loggedIn])

  const accounts = useCallback(async (key, ...params) => {
    console.log('accounts.fetcher', key, ...params)
    if (key === 'me') {
      if (loggedIn) {
        await sleep()
        return {
          data: {
            avatar_url: 'https://asktug.com/letter_avatar_proxy/v4/letter/d/13edae/50.png',
            id: 12345,
            username: 'fake'
          }
        }
      } else {
        return Promise.reject()
      }
    }
  }, [loggedIn])

  const asktug = useCallback(async (key, ...params) => {
    console.log('asktug.fetcher', key, ...params)
    await sleep()
    if (key === 'asktug.getNotifications') {
      return Promise.resolve(asktugNotificationsJson)
    } else if (key === 'asktug.getPrivateMessages') {
      return Promise.resolve(privateMessagesJson)
    } else {
      return Promise.reject()
    }
  }, [])


  const blog = useCallback(async (key, ...params) => {
    console.log('asktug.fetcher', key, ...params)
    await sleep()
    if (key === 'blog.getNotifications') {
      return Promise.resolve(blogNotificationsJson)
    } else {
      return Promise.reject()
    }
  }, [])

  return (
    <SiteComponentsContext.Provider value={{ fetchers: { accounts, asktug, blog } }}>
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
  loggedIn: true
}

