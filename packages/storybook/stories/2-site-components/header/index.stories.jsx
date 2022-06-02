import { Header, SiteComponentsContext } from '@pingcap-inc/tidb-community-site-components'
import React, { useCallback, useEffect } from 'react'
import { mutate } from 'swr'
import asktugUnreadNotificationsJson from '../asktug-notification-unread.json'
import asktugNotificationsJson from '../asktug-notification.json'
import blogNotificationsJson from '../blog-notification.json'
import blogUnreadNotificationsJson from '../blog-notification-unread.json'
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
      if (params[0].unread) {
        return Promise.resolve(asktugUnreadNotificationsJson)
      } else {
        return Promise.resolve(asktugNotificationsJson)
      }
    } else if (key === 'asktug.getPrivateMessages') {
      return Promise.resolve(privateMessagesJson)
    } else {
      return Promise.reject()
    }
  }, [])

  const blog = useCallback(async (key, ...params) => {
    console.log('blog.fetcher', key, ...params)
    await sleep()
    if (key === 'blog.getNotifications') {
      if (params[0].haveRead) {
        return Promise.resolve(blogNotificationsJson)
      } else {
        return Promise.resolve(blogUnreadNotificationsJson)
      }
    } else {
      return Promise.reject()
    }
  }, [])

  return (
    <SiteComponentsContext.Provider value={{ fetchers: { accounts, asktug, blog } }}>
      <Header />
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
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

