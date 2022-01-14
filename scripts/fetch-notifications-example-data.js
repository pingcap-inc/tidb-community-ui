const axios = require('axios')
const fs = require('fs/promises')
const path = require('path')

async function * fetch () {
  let url = '/notifications'
  let maxTryRequests = 100
  let i = 0

  while (url && maxTryRequests) {
    console.log('try', `${++i}/${maxTryRequests + i - 1}`, url)
    const { data: { notifications, load_more_notifications } } = await axios.get(url, {
      baseURL: 'https://asktug.com',
      headers: {
        accept: 'application/json',
        'api-key': process.env.ASKTUG_API_KEY,
        'api-username': process.env.ASKTUG_API_USERNAME
      }
    })

    for (const notification of notifications) {
      yield notification
    }

    maxTryRequests -= 1
    url = load_more_notifications

    await new Promise(resolve => setTimeout(resolve, 1500))
  }
}

const filename = path.resolve(__dirname, '../packages/storybook/stories/2-site-components/notification.json')

async function main () {
  const types = new Map()

  const put = (notification) => {
    let arr = types.get(notification.notification_type)
    if (!arr) {
      arr = []
      types.set(notification.notification_type, arr)
    }
    arr.push(notification)
  }

  const { notifications: prevNotifications } = JSON.parse(await fs.readFile(filename, { encoding: 'utf-8' }))

  for (let notification of prevNotifications) {
    put(notification)
  }

  for await (let notification of fetch()) {
    put(notification)
  }

  const notifications = []

  for (let [k, v] of [...types.entries()].sort((e1, e2) => Math.sign(e1[0] - e2[0]))) {
    notifications.push(v[0])
  }

  const result = {
    notifications,
    load_more_notifications: 'fake'
  }

  const text = JSON.stringify(result, undefined, 2)
  await fs.writeFile(filename, text, { encoding: 'utf-8' })
}

main().catch(console.error)
