import { Fetcher } from 'swr'
import { createContext } from 'react'

import mockDataAccountsPointsMe from "./accountsPointsMe.json";
import mockDataAccountsPointsTop from "./accountsPointsTop.json";
import mockDataAsktugUserSummary from "./asktugUserSummary.json";
import mockDataAsktugSite from "./asktugSite.json";
import mockDataAsktugBadges from "./asktugBadges.json";
import mockDataBlogRecommend from "./blogRecommend.json";
import mockDataBlogUsersUsernamePosts from "./blogUsersUsernamePosts.json";
import mockDataHomeEvents from "./homeEvents.json";

type FetcherKey = [key: string, ...args: any[]]

export interface SiteComponentsContextProps {
  fetchers: {
    // fetcher for accounts.pingcap.cn/*
    accounts: Fetcher<any, FetcherKey>

    // fetcher for asktug.com/*
    asktug: Fetcher<any, FetcherKey>

    // fetcher for tidb.io/blog/*
    blog: Fetcher<any, FetcherKey>

    // fetcher for tidb.io/next-api/*
    home: Fetcher<any, FetcherKey>
  }
}

export const sleep = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms))

const SiteComponentsContext = createContext<SiteComponentsContextProps>({
  fetchers: {
    accounts: async (key, ...params) => {
      console.log('accounts: ', {key}, {params})
      await sleep()
      return new Promise((resolve, reject) => {
        switch (key) {
          case 'accounts.points.me': resolve(mockDataAccountsPointsMe); break;
          case 'accounts.points.top': resolve(mockDataAccountsPointsTop); break;
          default: reject()
        }
      })
    },
    asktug: async (key, ...params) => {
      //throw new Error('fetchers.asktug not provided')
      console.log('asktug: ', {key}, {params})
      await sleep()
      return new Promise((resolve, reject) => {
        switch (key) {
          case 'asktug.user.summary': resolve(mockDataAsktugUserSummary); break;
          case 'asktug.site': resolve(mockDataAsktugSite); break;
          case 'asktug.badges': resolve(mockDataAsktugBadges); break;
          default: reject()
        }
      })
    },
    blog: async (key, ...params) => {
      //throw new Error('fetchers.blog not provided')
      console.log('blog: ', {key}, {params})
      await sleep()
      return new Promise((resolve, reject) => {
        switch (key) {
          case 'blog.getRecommend': resolve(mockDataBlogRecommend); break;
          case 'blog.users.posts': resolve(mockDataBlogUsersUsernamePosts); break;
          default: reject()
        }
      })
    },
    home: async (key, ...params) => {
      //throw new Error('fetchers.home not provided')
      console.log('home: ', {key}, {params})
      await sleep()
      return new Promise((resolve, reject) => {
        switch (key) {
          case 'home.events': resolve(mockDataHomeEvents); break;
          default: reject()
        }
      })
    },
  },
})

export default SiteComponentsContext
