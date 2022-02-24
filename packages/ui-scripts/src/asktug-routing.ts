declare global {
  interface Window {
    Discourse: any
  }
}

export function routeTo (url: string) {
  const router = window.Discourse.__container__.lookup('service:router')
  router.transitionTo(url)
}
