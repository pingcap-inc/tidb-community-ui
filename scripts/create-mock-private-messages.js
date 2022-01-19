const axios = require('axios')
const chance = new (require('chance').Chance)()

axios.defaults.baseURL = 'https://sso-test.asktug.com'

async function sendPrivateMessage ({ from, to, title, content }) {
  await axios.post('/posts',{
    title,
    target_usernames: to,
    raw: content,
    archetype: 'private_message'
  }, {
    headers: {
      'accept': 'application/json',
      'api-key': process.env.ASKTUG_API_KEY,
      'api-username': from
    }
  })
}

async function makeMockPrivateMessages (from, to, n, titlePrefix) {
  const key = chance.word()
  for (let i = 0; i < n; i++) {
    console.log('send message#%s', i + 1)
    await sendPrivateMessage({ from, to, title: `${titlePrefix} ${key} ${chance.word()}`, content: chance.paragraph() })
  }
}

makeMockPrivateMessages('system', 'asktug-test', 120, '测试私信').catch(e => console.error(e.response))

